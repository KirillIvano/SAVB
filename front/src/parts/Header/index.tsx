import React from 'react';
import {Grid, Col} from 'react-flexbox-grid';

import {
    HeaderLogo,
    HeaderHistory,
    HeaderUserInfo,
} from './components';
import styles from './styles.less';

const Header = () => (
    <header className={styles.header}>
        <Grid className={styles.headerContent}>
            <Col xs={1}>
                <HeaderLogo />
            </Col>
            <Col xs={3}>
                <HeaderHistory />
            </Col>
            <Col xsOffset={4} xs={4}>
                <HeaderUserInfo />
            </Col>
        </Grid>
    </header>
);

export default Header;
