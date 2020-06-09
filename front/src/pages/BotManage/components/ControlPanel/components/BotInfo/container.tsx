import React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {useParams} from 'react-router-dom';
import {Subtract} from 'utility-types';

import {RootState, RootAction} from '@/store/types';
import {getSingleBotAction} from '@/modules/bots/actions';
import {getBotName} from '@/modules/bots/getters';

type AdditionalProps = {
    botId: string;
}

type ConnectedProps = {
    botGetSingleInProgress: boolean;
    botGetSingleError: string | null;
    name: string | undefined;

    getBotInfo: () => void;
}

const mapStateToProps = ({botsState}: RootState, {botId}: AdditionalProps) => {
    const {
        botGetSingleInProgress,
        botGetSingleError,
    } = botsState;

    const name = getBotName(botsState, botId);

    return {
        botGetSingleInProgress,
        botGetSingleError,
        name,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>, {botId}: AdditionalProps) => ({
    getBotInfo: () => dispatch(getSingleBotAction(botId)),
});


export const withBotInfo = <TProps extends (AdditionalProps & ConnectedProps),>(
    Comp: React.ComponentType<TProps>,
) => {
    const ConnectedHoc = connect(
        mapStateToProps,
        mapDispatchToProps,
    )(Comp as React.ComponentType<ConnectedProps>);

    const HOC = (props: Subtract<TProps, ConnectedProps & AdditionalProps>) => {
        const params = useParams<{botId: string}>();
        const {botId} = params;

        return <ConnectedHoc {...props as TProps} botId={botId} />;
    };

    return HOC;
};

