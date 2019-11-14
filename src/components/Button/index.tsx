import React, { FC, ReactNode } from 'react';

interface ButtonProps {
  onClick?: () => void;
  className?: string;
  children: ReactNode;
}

export const Button: FC<ButtonProps> = ({ onClick, className = '', children }: ButtonProps) => (
  <button onClick={onClick} className={className} type="button">
    {children}
  </button>
);
