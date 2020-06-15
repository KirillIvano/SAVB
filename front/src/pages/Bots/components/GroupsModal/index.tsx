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

const ModalContent: React.FC<ModalContentProps> = ({
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
                    {groups.map(
                        ({id, ...rest}) =>
                            <GroupCard {...rest} id={id} key={id} />,
                    )}
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
            headline={'Группы'}
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

            <ModalContent {...{groups, groupsGettingError, groupsGettingInProgress}} />
        </Modal>
    );
};

const enchancedModal = withGroups(GroupsModal);

export default enchancedModal;
