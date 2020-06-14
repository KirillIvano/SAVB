import React from 'react';
import {useParams} from 'react-router-dom';

type AdditionalProps = {
    botId: string;
}

export const withBotId = <TProps extends AdditionalProps>(Comp: React.ComponentType<TProps>) =>
    (props: TProps) => {
        const {botId} = useParams<AdditionalProps>();

        return <Comp {...props} botId={botId} />;
    };
