import {MessageAction, AuthAction} from '../entities/socketActions';

type IncomingAction = MessageAction | AuthAction;

export const setConnection = (password: string, dataCallback?: (data: string) => void) => {
    const logSocket = new WebSocket('ws://localhost:8081');
    dataCallback;
    logSocket.onopen = (): void => {
        logSocket.send(JSON.stringify({password, type: 'auth'}));
    };

    logSocket.onmessage = (m): void => {
        const messagePayload: IncomingAction = JSON.parse(String(m.data));

        switch (messagePayload.type) {
        case 'auth': {
            console.log('Successfully authenticated');
            break;
        }
        case 'log': {
            const {log} = messagePayload;

            dataCallback && dataCallback(log);
            break;
        }
        }
    };
};

