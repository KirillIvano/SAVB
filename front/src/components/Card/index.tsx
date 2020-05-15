import React from 'react';
import classnames from 'classnames';

import styles from './styles.less';

interface CardProps {
    className?: string;
    children: React.ReactChild;
}

const Card: React.FC<CardProps> = ({
    children,
    className,
}) => (
    <div
        className={
            classnames(
                styles.card,
                {[String(className)]: className},
            )
        }
    >
        {children}
    </div>
);

export default Card;
