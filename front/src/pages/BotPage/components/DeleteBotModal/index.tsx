import React, {useEffect} from 'react';
import {useHistory} from 'react-router';

import {ConfirmationModal} from '@/uikit';

import {withBotDeleting} from './container';

type DeleteBotModalProps = {
    botDeletingInProgress: boolean;
    botDeletingSuccess: boolean;
    isBotDeleted: boolean;

    closeModal: () => void;
    isOpened: boolean;

    deleteBot: () => void;
}

const DeleteBotModal = ({
    botDeletingInProgress,
    botDeletingSuccess,
    isBotDeleted,

    closeModal,
    isOpened,

    deleteBot,
}: DeleteBotModalProps) => {
    const history = useHistory();
    useEffect(() => {
        if (botDeletingSuccess && isBotDeleted) {
            closeModal();
            history.push('/bots');
        }
    }, [botDeletingSuccess]);

    const handleConfirm = () => {
        deleteBot();
    };

    const handleReject = () => {
        closeModal();
    };

    return (
        <ConfirmationModal
            content={'Вы точно хотите удалить этого бота?'}
            handleApprove={handleConfirm}
            handleReject={handleReject}
            disabled={botDeletingInProgress}
            isOpen={isOpened}
        />
    );
};
export default withBotDeleting(DeleteBotModal);
