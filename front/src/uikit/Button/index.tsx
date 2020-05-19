import React from 'react';

import styles from './styles.less';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<ButtonProps> = ({
    children,
    ...props
}) => (
    <button {...props} className={styles.button}>
        {children}
    </button>
);

export default Button;
