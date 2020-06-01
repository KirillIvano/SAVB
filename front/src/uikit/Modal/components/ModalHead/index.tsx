import React from 'react';

import styles from './styles.less';
import closeIcon from './images/close.png';

type ModalHeadProps = {
    children: React.ReactNode;
    handleClose: () => void;
}

const ModalHead: React.FC<ModalHeadProps> = ({
    children,
    handleClose,
}) => (
    <div className={styles.modalHead}>
        {children}
        <img
            src={closeIcon}
            className={styles.closeIcon}
            onClick={handleClose}
        />
    </div>
);

export default ModalHead;
