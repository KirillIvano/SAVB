export type PopupMessageType = {
    type: 'error' | 'success';
    content: string;
    id: number;
};

export type PopupMessageStateType = {
    messages: PopupMessageType[];
}
