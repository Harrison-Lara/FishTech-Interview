import React from 'react';
import { Button as MatButton } from '@material-ui/core'

interface IButtonProps {
    color?: 'inherit' | 'primary' | 'secondary' | 'default';
    disableElevation?: boolean;
    disableFocusRipple?: boolean;
    fullWidth?: boolean;
    size?: 'small' | 'medium' | 'large';
    variant?: 'text' | 'outlined' | 'contained';
    onClick: any
    className?: any;
    children?: React.ReactText;
}

const Button = (props: IButtonProps) => {
    const { color, size, variant, onClick, className, ...rest } = props;

    return (
        <MatButton color={color} size={size} variant={variant} onClick={onClick} className={className}  {...rest} />
    )
}

export { Button };