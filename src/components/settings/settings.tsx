import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import * as actionCreators from '../../actions/index';

import { CURRENCIES } from '../shared/consts';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    inputWidth: {
        width: '120px',
    },
  }),
);

function SettingsView(settings: any) {
    const classes = useStyles();

    const handleSourceCurrencyChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        settings.updateSourceCurrency(event.target.value);
    };

    const handleCurrencyListChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        settings.addToCurrentList(event.target.value);
    };

    const handleDelete = (currencyName: string) => () => {
        settings.removeFromCurrentList(currencyName);
    };

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <InputLabel id="demo-simple-select-label">Source Currency</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={settings.sourceCurrency}
                    onChange={handleSourceCurrencyChange}
                    className={classes.inputWidth}
                    >
                    {CURRENCIES.map((currency) =>
                        <MenuItem key={currency} value={currency}>{currency}</MenuItem>
                    )}
                </Select>
            </div>
            <div>
                <TextField id="standard-basic" label="Refresh Rate" value={settings.updateFrequency} className={classes.inputWidth}/>
            </div>
            <div>
                <InputLabel id="currency-list-label">Currency List</InputLabel>
                <Select
                    labelId="currency-list-label"
                    id="demo-simple-select"
                    value={settings.currencyList}
                    multiple
                    onChange={handleCurrencyListChange}
                    className={classes.inputWidth}
                    >
                {CURRENCIES.map((currency) => {
                    if (currency !== settings.sourceCurrency) {
                            return <MenuItem key={currency} value={currency}>{currency}</MenuItem>
                    }
                })}
                </Select>
            </div>
            <div>
                {settings.currencyList.map((item: string) => {
                    return (
                        <li key={item}>
                            <Chip
                            label={item}
                            onDelete={handleDelete(item)}
                            className={item}
                            />
                        </li>
                    );
                })}
            </div>
        </form>
    ); 
}

const mapStateToProps = (state: any) => state.settingsReducer;

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators(actionCreators, dispatch);
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(SettingsView);
