import React from 'react';

import {SidePanel} from '@/parts';

import {NextStages} from '..';
import styles from './styles.less';

type StageSidePanelProps = {
    stageId: string;
}

const StageSidePanel = ({
    stageId,
}: StageSidePanelProps) => (
    <SidePanel className={styles.sidePanel}>
        <h1 className={styles.sidePanelHeadline}>Связаные сообщения</h1>
        <NextStages stageId={stageId} />
    </SidePanel>
);

export default StageSidePanel;
