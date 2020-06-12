import React from 'react';
import classnames from 'classnames';

import styles from './styles.less';
import {getBgStyles, getSizesStyle} from './helpers';

interface TooltipProps extends React.ImgHTMLAttributes<HTMLImageElement>{
    className?: string;
    src?: string;
    size?: 'small' | 'large' | number;
    isPlaceholder?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({
    className,
    src,
    size,
    isPlaceholder=false,

    ...props
}) => (
    <div
        {...props}
        style={{
            ...getBgStyles(isPlaceholder, src),
            ...getSizesStyle(size),
        }}
        className={
            classnames(
                styles.tooltip,
                {
                    [className as string]: Boolean(className),
                    [styles.large]: size === 'large',
                    [styles.small]: size === 'small',
                },
            )
        }
    />
);

export default Tooltip;
