import React from 'react';

import styles from './styles.less';

const PageHeadline = ({
    content,
}: {content: string}) => (<h1 className={styles.pageHeadline}>{content}</h1>);

export default PageHeadline;
