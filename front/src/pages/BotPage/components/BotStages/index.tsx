import React, {
    useEffect,
    useState,
    useMemo,
} from 'react';

import {StagePreview} from '@/modules/stages/types';
import {
    TextInput,
    Preloader,
    ErrorView,
    Fade,
} from '@/uikit';

import styles from './styles.less';
import {withStages} from './container';


type BotStageProps = {
    id: string;
    name: string;
}

const BotStage = ({
    id,
    name,
}: BotStageProps) => (
    <div className={styles.stage}>
        <a className={styles.stageLink} href={`/stage/${id}`}>
            {name}
        </a>
    </div>
);


type BotStagesBlockProps = {
    stages: StagePreview[];
}

const BotStagesBlock = ({
    stages,
}: BotStagesBlockProps) => (
    <div className={styles.stagesBlock}>
        {
            stages.map(
                ({name, id}) => (
                    <BotStage
                        name={name}
                        id={id}
                        key={id}
                    />
                ),
            )
        }
    </div>
);


const filterStages = (stages: StagePreview[], searchString: string) =>
    stages.filter(stage => stage.name.indexOf(searchString) !== -1);

type BotStagesProps = {
    stages: StagePreview[];
    getStagesInProgress: boolean;
    getStagesError: string | null;
    botId: string;

    getStages: () => void;
}

const BotStages = ({
    stages,
    getStagesInProgress,
    getStagesError,

    getStages,
}: BotStagesProps) => {
    const [searchValue, setSearchValue] = useState('');

    const filteredStages = useMemo(
        () => filterStages(stages, searchValue),
        [stages, searchValue],
    );

    useEffect(() => {getStages();}, []);

    if (getStagesInProgress) return <Preloader />;
    if (getStagesError) return <ErrorView content={getStagesError} />;

    return (
        <Fade duration={.3}>
            <TextInput
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}

                type={'text'}
                name={'search_stage'}

                className={styles.searchInput}
                labelText={'Найти сообщение'}
            />

            <BotStagesBlock stages={filteredStages} />
        </Fade>
    );
};

export default withStages(BotStages);
