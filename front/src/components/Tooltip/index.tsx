import React from 'react';
import styles from './styles.less';
import classnames from 'classnames';

interface TooltipProps extends React.ImgHTMLAttributes<HTMLImageElement>{
    className?: string;
    src: string;
    size: 'small' | 'large';
}

const Tooltip: React.FC<TooltipProps> = ({
    className,
    src,
    size,
    ...props
}) => (
    <div
        {...props}
        style={{backgroundImage: `url("${src}")`}}
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
