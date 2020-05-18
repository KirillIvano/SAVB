import React from 'react';
import classnames from 'classnames';
import ReactModal from 'react-modal';

import styles from './styles.less';
import closeIcon from './images/close.png';

type ModalProps = {
    isOpen: boolean;
    headline: string;
};

const appEl = document.getElementById('root') as HTMLDivElement;

const Modal: React.FC<ModalProps> = ({
    isOpen,
    headline,
}) => (
    <ReactModal
        isOpen={isOpen}
        appElement={appEl}
        overlayClassName={styles.overlay}
        className={styles.modal}
    >
        <div className={styles.modalHead}>
            <h3 className={styles.headline}>{headline}</h3>
            <img src={closeIcon} alt="" className={styles.closeIcon} />
        </div>
    </ReactModal>
);

export default Modal;
