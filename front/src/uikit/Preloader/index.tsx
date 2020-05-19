import React from 'react';

import preloaderImage from './images/preloader.svg';
import styles from './styles.less';

const Preloader = () => (
    <div className={styles.preloaderContainer}>
        <img src={preloaderImage} className={styles.preloader} alt="" />
    </div>
);

export default Preloader;
