import React from 'react';
import logoImage from './logo.svg';

import styles from './styles.less';

const HeaderLogo = () => (
    <img src={logoImage} className={styles.logo} />
);

export default HeaderLogo;
