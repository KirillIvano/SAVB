import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router';

import {TextInput, Button, Preloader, ErrorView} from '@/uikit';
import {BackIcon} from '@/uikit/Icons';

import {withStageEdit} from './container';
import styles from './styles.less';

type StageSettingsProps = {
    name: string;
    text: string;

    getStageLoading: boolean;
    getStageError: string | null;
    getStageSuccess: boolean;

    getStage: () => void;
}

const Settings = ({
    name,

    getStageLoading,
    getStageError,
    getStageSuccess,
}: StageSettingsProps) => {
    const [newName, setNewName] = useState(name);

    const history = useHistory();

    if (getStageLoading || !getStageSuccess) return <Preloader />;
    if (getStageError) return <ErrorView content={getStageError} />;

    return (
        <div className={styles.stageEdit}>
            <BackIcon
                size="large"
                className={styles.backIcon}
                onClick={() => history.goBack()}
            />

            <h1 className={styles.stageEditHeadline}>
                Редактирование
            </h1>

            <div className={styles.inputs}>
                <TextInput
                    labelText="Название состояния"
                    name="stage_name"
                    wrapperClassName={styles.stageEditInput}

                    isEdited={newName !== name}
                    value={newName}
                    onChange={e => setNewName(e.currentTarget.value)}
                />
            </div>

            <div className={styles.controls}>
                <Button
                    className={styles.controlBtn}
                    disabled={true}
                    styling="danger"
                >
                    Удалить
                </Button>

                <Button className={styles.controlBtn}>
                    Сохранить
                </Button>
            </div>
        </div>
    );
};

export default withStageEdit(Settings);
