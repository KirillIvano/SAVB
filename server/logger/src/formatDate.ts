const formatWithZero = (num: number) =>  num > 9 ? num : `0${num}`;

export const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);

    const unformattedHours = date.getHours();
    const unformattedMinutes= date.getMinutes();
    const unformattedDate = date.getDate();
    const unformattedMonth = date.getMonth() + 1;
    const unformattedSeconds = date.getSeconds();

    const formattedHours = formatWithZero(unformattedHours);
    const formattedMinutes = formatWithZero(unformattedMinutes);
    const formattedDate = formatWithZero(unformattedDate);
    const formattedMonth = formatWithZero(unformattedMonth);
    const formattedSeconds = formatWithZero(unformattedSeconds);

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${formattedDate}.${formattedMonth}.${date.getFullYear()}`;
};
