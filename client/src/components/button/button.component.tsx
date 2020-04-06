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
  onChange?: any;
}

const Button = (props: IButtonProps) => {
  const { color, size, variant, onClick, className, onChange, ...rest } = props;

  return (
    <MatButton color={color} size={size} variant={variant} onChange={onChange} onClick={onClick} className={className}  {...rest} />
  )
}

export { Button };