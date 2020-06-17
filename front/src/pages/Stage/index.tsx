import React, { useEffect } from 'react';

import {SidePaneledLayout, SidePaneledRest} from '@/parts';
import {Preloader, ErrorView, PageWrapper} from '@/uikit';

import styles from './styles.less';
import {
    StageSidePanel,
    StageEdit,
    StageTriggers,
} from './components';
import {withStageId, withStageGetting} from './container';

type StageManagePageProps = {
    stageId: string;
    getStageSuccess: boolean;
    getStageError: string | null;

    getStage: () => void;
}

const StageManagePage = ({
    stageId,
    getStageSuccess,
    getStageError,

    getStage,
}: StageManagePageProps) => {
    useEffect(() => {getStage();}, []);

    if (getStageError) return <ErrorView content={getStageError} />;
    if (!getStageSuccess) return <Preloader />;

    return (
        <PageWrapper>
            <SidePaneledLayout>
                <StageSidePanel stageId={stageId} />
                <SidePaneledRest className={styles.botManagePage}>
                    <StageEdit stageId={stageId} />
                    <StageTriggers />
                </SidePaneledRest>
            </SidePaneledLayout>
        </PageWrapper>
    );
};

export default withStageId(
    withStageGetting(StageManagePage),
);
