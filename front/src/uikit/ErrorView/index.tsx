import React from 'react';

import styles from './styles.less';

type ErrorViewProps = {
    content: string;
}

const ErrorView: React.FC<ErrorViewProps> = ({
    content,
}) => (
    <div className={styles.errorViewContainer}>
        <div className={styles.errorView}>
            <h3 className={styles.headline}>Произошла ошибка</h3>
            <p className={styles.content}>{content}</p>
        </div>
    </div>
);

export default ErrorView;
