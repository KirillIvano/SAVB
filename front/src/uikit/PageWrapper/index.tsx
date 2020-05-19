import React from 'react';

import styles from './styles.less';

const PageWrapper = ({children}: {children: React.ReactChild[] | React.ReactChild}) => (
    <div className={styles.pageWrapper}>{children}</div>
);

export default PageWrapper;
