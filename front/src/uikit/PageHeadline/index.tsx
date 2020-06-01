import React from 'react';
import classnames from 'classnames';

import styles from './styles.less';

type PageHeadlineProps = {
    children: React.ReactNode;
    className: string;
}

const PageHeadline: React.FC<PageHeadlineProps> = ({
    children,
    className,
}) => (
    <h1 className={classnames(styles.pageHeadline, className)}>
        {children}
    </h1>
);

export default PageHeadline;
