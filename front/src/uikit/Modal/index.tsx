import React from 'react';
import ReactModal from 'react-modal';

import styles from './styles.less';

type ModalProps = {
    isOpen: boolean;
    children: React.ReactNode;
    closable?: boolean;
    handleClose?: () => void;
};

const appEl = document.getElementById('root') as HTMLDivElement;

const Modal: React.FC<ModalProps> = ({
    isOpen,
    closable,
    children,
    handleClose,
}) => (
    <ReactModal
        isOpen={isOpen}
        appElement={appEl}
        onRequestClose={handleClose}
        shouldCloseOnOverlayClick={closable}
        overlayClassName={styles.overlay}
        className={styles.modal}
    >
        {children}
    </ReactModal>
);

export default Modal;
