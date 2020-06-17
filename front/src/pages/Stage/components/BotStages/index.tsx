import React from 'react';

import {StageType, StagePreview} from '@/modules/stages/types';

import styles from './styles.less';
import {withConnectedStages} from './container';


type BotStagesProps = {
    presentStage: StageType;
    nextStagesPreviews: StagePreview[];
}

const BotStages = ({
    presentStage,
    nextStagesPreviews,
}: BotStagesProps) => {
    const {name: presentStageName} = presentStage;


    return (
        <div className={styles.botStages}>
            <div className={styles.presentStage}>{presentStageName}</div>
            <div className={styles.nextStages}>
                {nextStagesPreviews.map(
                    ({name, id}) => (
                        <div
                            className={styles.nextStagesItem}
                            key={id}
                        >
                            {name}
                        </div>
                    ),
                )}
            </div>
        </div>
    );
};

export default withConnectedStages(BotStages);
