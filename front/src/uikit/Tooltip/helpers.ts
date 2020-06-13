export const getSizesStyle = (size?: string | number) =>
    typeof size === 'number' ? {width: `${size}px`, height: `${size}px`} : {};

const DEFAULT_BACKGROUND_STYLE = {background: '#ccc'};
export const getBgStyles = (isPlaceholder: boolean, src?: string) =>
    isPlaceholder ? DEFAULT_BACKGROUND_STYLE : {backgroundImage: `url("${src}")`};

