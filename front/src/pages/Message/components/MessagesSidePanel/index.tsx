import React from 'react';

import {SidePanel} from '@/parts';

import {NextMessages} from './../';
import styles from './styles.less';

type MessageSidePanelProps = {
    messageId: string;
}

const MessageSidePanel = ({
    messageId,
}: MessageSidePanelProps) => (
    <SidePanel className={styles.sidePanel}>
        <h1 className={styles.sidePanelHeadline}>Связаные сообщения</h1>
        <NextMessages messageId={messageId} />
    </SidePanel>
);

export default MessageSidePanel;
