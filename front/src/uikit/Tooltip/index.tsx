import React from 'react';
import styles from './styles.less';
import classnames from 'classnames';

interface TooltipProps extends React.ImgHTMLAttributes<HTMLImageElement>{
    className?: string;
    src?: string;
    size?: 'small' | 'large';
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
        style={isPlaceholder ? {background: '#ccc'} : {backgroundImage: `url("${src}")`}}
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
