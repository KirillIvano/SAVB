import React, {useEffect} from 'react';
import {Grid, Row} from 'react-flexbox-grid';

import {
    Modal,
    Fade,
    Preloader,
    ErrorView,
} from '@/uikit';
import {ReloadIcon} from '@/uikit/Icons';
import {ModalHead} from '@/uikit/Modal/components';
import {GroupType} from '@/modules/groups/types';

import styles from './styles.less';
import {withGroups} from '../../containers/withGroups';
import {GroupCard} from './../';

type ModalContentProps = {
    groups: GroupType[];
    groupsGettingInProgress: boolean;
    groupsGettingError: string | null;
}

const GroupsModalContent: React.FC<ModalContentProps> = ({
    groups,
    groupsGettingInProgress,
    groupsGettingError,
}) => {
    if (groupsGettingInProgress) {
        return <Preloader />;
    }

    if (groupsGettingError) {
        return <ErrorView content={groupsGettingError} />;
    }

    return (
        <Fade duration={0.5}>
            <Grid fluid>
                <Row>
                    {
                        groups.length ? (groups.map(
                            ({id, ...rest}) =>
                                <GroupCard {...rest} id={id} key={id} />,
                        )) : (
                            <div className={styles.noGroups}>
                                Похоже, у вас нет групп, в которых вы являетесь администратором. Создайте новую и приходите назад:)
                            </div>
                        )
                    }
                </Row>
            </Grid>
        </Fade>
    );
};

type GroupsModalProps = {
    isOpen: boolean;
    handleClose: () => void;

    getGroups: () => void;
} & ModalContentProps;

const GroupsModal: React.FC<GroupsModalProps> = ({
    isOpen,
    handleClose,

    groups,
    groupsGettingInProgress,
    groupsGettingError,

    getGroups,
}) => {
    useEffect(() => {
        isOpen && getGroups();
    }, [isOpen]);

    return (
        <Modal
            isOpen={isOpen}
            handleClose={handleClose}
            closable={true}
        >
            <ModalHead handleClose={handleClose}>
                <div className={styles.head}>
                    <h3 className={styles.headline}>Группы</h3>
                    <ReloadIcon className={styles.icon} size={'large'} onClick={getGroups} />
                </div>
            </ModalHead>

            <GroupsModalContent {...{groups, groupsGettingError, groupsGettingInProgress}} />
        </Modal>
    );
};

const enhancedModal = withGroups(GroupsModal);

export default enhancedModal;
