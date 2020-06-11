type MessageType = {
    id: string;
    name: string;
    text: string;
}
type MessagePreview = {
    id: string;
    name: string;
}

type MessagesStorageType = Record<string, MessageType>

type MessagesStateType = {
    messages: MessagesStorageType;

    getBotMessagesLoading: boolean;
    getBotMessagesError: string | null;
}
