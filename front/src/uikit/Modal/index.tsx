import React from 'react';
import ReactModal from 'react-modal';

import styles from './styles.less';
import closeIcon from './images/close.png';

type ModalProps = {
    isOpen: boolean;
    headline: string;
    children: React.ReactChild | React.ReactChild[];
    closable?: boolean;
};

const appEl = document.getElementById('root') as HTMLDivElement;

const Modal: React.FC<ModalProps> = ({
    isOpen,
    headline,
    closable,
    children,
}) => (
    <ReactModal
        isOpen={isOpen}
        appElement={appEl}
        onRequestClose={() => {console.log('close');}}
        shouldCloseOnOverlayClick={closable}
        overlayClassName={styles.overlay}
        className={styles.modal}
    >
        <div className={styles.modalHead}>
            <h3 className={styles.headline}>{headline}</h3>
            <img src={closeIcon} alt="" className={styles.closeIcon} />
        </div>

        <div className={styles.modalContent}>
            {children}
        </div>
    </ReactModal>
);

export default Modal;
