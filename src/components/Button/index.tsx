import PropTypes from 'prop-types';
import React, { FC, ReactNode } from 'react';
import { Loading } from '../Loading';
import './Button.scss';

interface ButtonProps {
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
}

export const Button: FC<ButtonProps> = ({ onClick, className, children }: ButtonProps) => (
  <button onClick={onClick} className={className} type="button">
    {children}
  </button>
);

interface WithLoadingProps {
  isLoading: boolean;
}

const withLoading = <P extends object>(Component: React.ComponentType<P>): FC<P & WithLoadingProps> => ({
  isLoading,
  ...rest
}: WithLoadingProps) => (isLoading ? <Loading /> : <Component {...(rest as P)} />);

export const ButtonWithLoading: React.FunctionComponent<ButtonProps & WithLoadingProps> = withLoading(Button);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = { className: '' };
