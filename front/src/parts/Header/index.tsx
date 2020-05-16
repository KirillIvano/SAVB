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
                <HeaderUserInfo
                    name={'Секс Машина'}
                    id={'1'}
                    image={'https://sun9-4.userapi.com/c627218/v627218363/36f33/4wYX5S3fR18.jpg?ava=1'}
                />
            </Col>
        </Grid>
    </header>
);

export default Header;
