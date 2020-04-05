import React from 'react';
import { TextField as MatTextField } from '@material-ui/core'

interface TextfieldProps {
    children?: React.ReactNode;
    disabled?: boolean;
    error?: boolean;
    fullWidth?: boolean;
    helperText?: string;
    id: string;
    label: string;
    multiline?: boolean;
    name: string;
    placeholder?: string;
    required?: boolean;
    rows?: string | number;
    rowsMax?: string | number;
    type?: string;
    value: string;
}

const TextField = (props: TextfieldProps) => {
    const { id, label, name, value, ...rest } = props;

    return (
        <MatTextField id={id} label={label} name={name} value={value} {...rest} />
    )
}

export { TextField };