import './main.less';
import {formatDate} from './formatDate';
// import {setConnection} from './services/logsSocket';

// const passwordForm = document.getElementById('keyForm') as HTMLFormElement;
// const inputForm = document.getElementsByName('password')[0] as HTMLInputElement;
const messageBox = document.getElementsByClassName('message-box')[0] as HTMLElement;
let password = null;

type LogType = {
    req_data?: string;
    res_data?: string;
    error?: string;
    status: number;
    url: string;
    date: string;
    type?: string;
}

const getLogHtml = ({
    status,
    url,
    date,
    req_data: requestBody,
    res_data: responseText,
    error,
}: LogType): string => {
    const logType = status >= 300 ? 'error' : 'success';

    let view = `
        <div class="log">
            <h1 class="url">${url}</h1>
    `;

    if (logType === 'error') {
        view += `<p class="status error">status: ${status}</p>`;
    } else {
        view += `<p class="status">status: ${status}</p>`;
    }

    view += `<p class="date">date: ${formatDate(date)}</p>`;

    if (requestBody) {
        const data = JSON.parse(requestBody);
        const content = JSON.stringify(data, null, 4);

        view += `
        <div class="content-wrapper">
            <span>Request:</span>
            <p class="content">${content}</p>
        </div>
        `;
    }

    if (responseText) {
        let content = responseText || error;
    
        if (logType !== 'error') {
            console.log(responseText);
            try {
                const data = JSON.parse(responseText);
                content = JSON.stringify(data, null, 4);
            } catch {
                content = responseText
            }
        }

        view += `
            <div class="content-wrapper">
                <span>${logType.toUpperCase() || 'Response'}:</span>
                <p class="content">${content}</p>
            </div>
        `;
    }

    view += '</div>';

    return view;
};


fetch(
    `http://194.67.109.99:500/api/logs`,
    {
        headers: {
            'Cache-Control': 'no-cache',
        },
    }
).then(res => res.json()).then(
    ({data: logs} :{data: LogType[]}) => {
        const htmlContent = logs.reduce((acc, log) => acc + getLogHtml(log), '');

        messageBox.insertAdjacentHTML('beforeend', htmlContent);
    },
);
