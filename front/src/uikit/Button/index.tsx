import React from 'react';
import classnames from 'classnames';

import styles from './styles.less';

type ButtonStyleType = 'normal' | 'danger'

interface ButtonProps extends  React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    styling?: ButtonStyleType;
}

const Button = ({
    children,
    className,
    styling = 'normal',

    ...props
}: ButtonProps) => (
    <button
        {...props}
        className={
            classnames(
                styles.button,
                className,
                {[styles.danger]: styling == 'danger'},
            )
        }
    >
        {children}
    </button>
);

export default Button;
