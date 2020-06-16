import React from 'react';
import logoImage from './logo.svg';

import styles from './styles.less';

const HeaderLogo = () => (
    <a href={'/'}>
        <img src={logoImage} className={styles.logo} />
    </a>
);

export default HeaderLogo;
