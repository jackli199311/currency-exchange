import React, { useEffect } from 'react';
import Table from '@material-ui/core/Table';
import { createStyles, Theme, withStyles, WithStyles, makeStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { API } from '../shared/consts';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/index';
import Converter from './converter';

const axios = require('axios');

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
});

const dialogueStyles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
});

export interface DialogTitleProps extends WithStyles<typeof dialogueStyles> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
}

const DialogTitle = withStyles(dialogueStyles)((props: DialogTitleProps) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme: Theme) => ({
    root: {
      padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
}))(MuiDialogActions);
  

function ExchangeRatesView(props: any) {
    let settingsState = props.settingsReducer;
    let dataState = props.dataReducer;
    const classes = useStyles();


    const getCurrentData = () => {
        if (settingsState && settingsState.sourceCurrency && settingsState.currencyList) {
            axios.get(API + 'latest?base=' + settingsState.sourceCurrency + '&symbols=' + settingsState.currencyList.toString())
                .then((response: any) => {
                    // handle success
                    props.resultsUpdated();
                    props.updateCurrentRate(response.data);
                })
                .catch((error: any) => {
                    // handle error
                    props.resultsUpdated();
                    props.updateCurrentRate({});
                });
        }
    }

    const getHistoricalData = () => {
        if (settingsState && settingsState.sourceCurrency && settingsState.currencyList) {
            let today = new Date();
            let dd = today.getDate();
            let mm = today.getMonth() + 1;
            let yyyy = today.getFullYear();
            let todayString = yyyy + '-' + mm + '-' + dd;

            let last30days = new Date(today.setDate(today.getDate() - 30));
            dd = last30days.getDate();
            mm = last30days.getMonth() + 1;
            yyyy = last30days.getFullYear();
            let last30DaysString = yyyy + '-' + mm + '-' + dd;

            axios.get(API + 'timeseries?base=' + settingsState.sourceCurrency + '&symbols=' + settingsState.currencyList.toString() + '&start_date=' + last30DaysString + '&end_date=' + todayString)
                .then((response: any) => {
                    props.resultsUpdated();
                    props.updateHistoryData(response.data);
                })
                .catch((error: any) => {
                    props.resultsUpdated();
                    props.updateHistoryData({});
                });
        }
    }

    useEffect(() => {
        getCurrentData();
        getHistoricalData();
        props.store.subscribe(() => {
            const state = props.store.getState();
            settingsState = state.settingsReducer;
            dataState = state.dataReducer;
            if (state.settingsReducer.isNew) {
                getCurrentData();
                getHistoricalData();
                setInterval(() => {
                    getCurrentData();
                }, settingsState.updateFrequency * 1000 * 60);
            }
        });
    }, []);

    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState<string>('');

    const handleClickOpen = (key: string) => {
        setOpen(true);
        setSelected(key)
    };
    const handleClose = () => {
        setOpen(false);
        setSelected('')
    };

    return (
        <div>
            <div style={{textAlign: 'left', margin: '20px'}}>
                Source: {settingsState.sourceCurrency}
            </div>
            {
                dataState && dataState.currentRates && dataState.currentRates.rates ? (
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                            <TableCell>Currency</TableCell>
                            <TableCell>Current Rate</TableCell>
                            {
                                dataState && dataState.historyRates && dataState.historyRates.rates ? (
                                Object.keys(dataState.historyRates.rates).map((key: string, index: number) => (
                                    <TableCell>{key}</TableCell>
                                ))) : null
                            }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                            Object.keys(dataState.currentRates.rates).map((key: string, index: number) => (
                                <TableRow key={key} onClick={() => handleClickOpen(key)}>
                                    <TableCell component="th" scope="row">
                                        {key}
                                    </TableCell>
                                    <TableCell>{dataState.currentRates.rates[key]}</TableCell>
                                    {
                                        dataState && dataState.historyRates && dataState.historyRates.rates ? (
                                        Object.keys(dataState.historyRates.rates).map((histKey: string, index: number) => (
                                            <TableCell>{dataState.historyRates.rates[histKey][key]}</TableCell>
                                        ))) : null
                                    }
                                </TableRow>
                            ))
                            }
                        </TableBody>
                        </Table>
                    </TableContainer>
                ) : null
            }


            {
                dataState && dataState.currentRates && dataState.currentRates.rates ? (
                    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                        Converter
                        </DialogTitle>
                        <DialogContent dividers>
                            <Converter 
                                sourceCurrency={settingsState.sourceCurrency} 
                                targetCurrency={selected} 
                                exchangeRate={dataState.currentRates.rates[selected]}>
                            </Converter>
                        </DialogContent>
                    </Dialog>
                ): null
            }
        </div>

    )
}

const mapStateToProps = (state: any, props: any) => state;

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators(actionCreators, dispatch);
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(ExchangeRatesView);