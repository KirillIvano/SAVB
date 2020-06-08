import React from 'react';
import classnames from 'classnames';
import {getId} from '@/util/getId';

import styles from './styles.less';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    labelText: string;
    className?: string;
}

const TextInput = ({
    labelText,
    className,

    ...props
}: InputProps) => {
    const inputId = getId();

    return (
        <div className={styles.inputWrapper}>
            <label
                className={styles.label}
                htmlFor={inputId}
            >
                {labelText}
            </label>

            <input
                {...props}
                className={classnames(styles.input, className)}
                id={inputId}
            />
        </div>
    );
};
export default TextInput;
