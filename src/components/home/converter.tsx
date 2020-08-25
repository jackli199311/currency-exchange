import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function Converter(props: any) {
    const [sourceValue, setValue] = React.useState<number>(1);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(+event.target.value);
    };

    return (
        <form noValidate autoComplete="off">
            <TextField id="standard-basic" defaultValue={sourceValue} onChange={handleChange}/>
            {props.sourceCurrency}
        =
        {(sourceValue * props.exchangeRate).toFixed(3)}
        {props.targetCurrency}
        </form>
    );
}