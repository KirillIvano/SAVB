import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router';

import {TextInput, Button, Preloader, ErrorView} from '@/uikit';
import {BackIcon} from '@/uikit/Icons';

import {withMessageEdit} from './container';
import styles from './styles.less';

type MessageSettingsProps = {
    name: string;
    text: string;

    getMessageLoading: boolean;
    getMessageError: string | null;
    getMessageSuccess: boolean;

    getMessage: () => void;
}

const Settings = ({
    name,
    text,

    getMessageLoading,
    getMessageError,
    getMessageSuccess,
}: MessageSettingsProps) => {
    const [newName, setNewName] = useState(name);
    const [newText, setNewText] = useState(text);

    const history = useHistory();

    if (getMessageLoading || !getMessageSuccess) return <Preloader />;
    if (getMessageError) return <ErrorView content={getMessageError} />;

    return (
        <div className={styles.messageEdit}>
            <BackIcon
                size="large"
                className={styles.backIcon}
                onClick={() => history.goBack()}
            />

            <h1 className={styles.messageEditHeadline}>
                Редактирование
            </h1>

            <div className={styles.inputs}>
                <TextInput
                    labelText="Название сообщения"
                    name="message_name"
                    wrapperClassName={styles.messageEditInput}

                    isEdited={newName !== name}
                    value={newName}
                    onChange={e => setNewName(e.currentTarget.value)}
                />
                <TextInput
                    labelText="Текст сообщения"
                    name="message_text"
                    wrapperClassName={styles.messageEditInput}

                    isEdited={newText !== text}
                    value={newText}
                    onChange={e => setNewText(e.currentTarget.value)}
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

export default withMessageEdit(Settings);
