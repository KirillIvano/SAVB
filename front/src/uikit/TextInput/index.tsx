import React, { useMemo } from 'react';
import classnames from 'classnames';
import {getId} from '@/util/getId';

import styles from './styles.less';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    labelText: string;
    className?: string;
    wrapperClassName?: string;
}

const TextInput = ({
    labelText,
    className,
    wrapperClassName,
    value,

    ...props
}: InputProps) => {
    const inputId = useMemo(() => getId(), []);

    return (
        <div className={classnames(
            styles.inputWrapper,
            wrapperClassName,
        )}>
            <input
                {...props}
                value={value}
                className={classnames(
                    styles.input,
                    className,
                    {
                        [styles.filled]: Boolean(value),
                    },
                )}
                id={inputId}
            />

            <label
                className={styles.label}
                htmlFor={inputId}
            >
                {labelText}
            </label>
        </div>
    );
};
export default TextInput;
