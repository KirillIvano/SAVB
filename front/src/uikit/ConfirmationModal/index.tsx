import React from 'react';
import ReactModal from 'react-modal';

import {Button} from '@/uikit';

import styles from './styles.less';

type ConfirmationModalProps = {
    handleApprove: () => void;
    handleReject: () => void;

    content: string;
    disabled: boolean;
    isOpen: boolean;
}

const ConfirmationModal = ({
    handleApprove,
    handleReject,

    content,
    disabled,
    isOpen,
}: ConfirmationModalProps) => (
    <ReactModal
        isOpen={isOpen}
        shouldCloseOnEsc={false}
        shouldCloseOnOverlayClick={false}
        overlayClassName={styles.modalBack}
        className={styles.modal}
    >
        <p>{content}</p>
        <div className={styles.controls}>
            <Button
                disabled={disabled}
                onClick={handleApprove}
            >
                Подтвердить
            </Button>

            <Button
                disabled={disabled}
                styling='danger'
                onClick={handleReject}
            >
                Отменить
            </Button>
        </div>
    </ReactModal>
);

export default ConfirmationModal;
