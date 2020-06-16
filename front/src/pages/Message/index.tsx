import React, { useEffect } from 'react';

import {SidePaneledLayout, SidePaneledRest} from '@/parts';
import {Preloader, ErrorView, PageWrapper} from '@/uikit';

import styles from './styles.less';
import {
    MessageSidePanel,
    MessageEdit,
    MessageTriggers,
} from './components';
import {withMessageId, withMessageGetting} from './container';

type MessageManagePageProps = {
    messageId: string;
    getMessageSuccess: boolean;
    getMessageError: string | null;

    getMessage: () => void;
}

const MessageManagePage = ({
    messageId,
    getMessageSuccess,
    getMessageError,

    getMessage,
}: MessageManagePageProps) => {
    useEffect(() => {getMessage();}, []);

    if (getMessageError) return <ErrorView content={getMessageError} />;
    if (!getMessageSuccess) return <Preloader />;

    return (
        <PageWrapper>
            <SidePaneledLayout>
                <MessageSidePanel messageId={messageId} />
                <SidePaneledRest className={styles.botManagePage}>
                    <MessageEdit messageId={messageId} />
                    <MessageTriggers />
                </SidePaneledRest>
            </SidePaneledLayout>
        </PageWrapper>
    );
};

export default withMessageId(
    withMessageGetting(MessageManagePage),
);
