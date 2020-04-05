import React from 'react';
import { TextField as MatTextField } from '@material-ui/core'

interface ITextfieldProps {
    children?: React.ReactNode;
    disabled?: boolean;
    error?: boolean;
    fullWidth?: boolean;
    helperText?: string;
    id: string;
    label: string;
    multiline?: boolean;
    placeholder?: string;
    required?: boolean;
    rows?: string | number;
    rowsMax?: string | number;
    onBlur?: any
    type?: string;
    value?: string;
    onChange: any
    className?: any;
}

const TextField = (props: ITextfieldProps) => {
    const { id, label, value, onChange, ...rest } = props;

    return (
        <MatTextField id={id} label={label} value={value} onChange={onChange} {...rest} />
    )
}

export { TextField };