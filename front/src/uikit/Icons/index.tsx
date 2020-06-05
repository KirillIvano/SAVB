import React from 'react';
import classnames from 'classnames';

import styles from './styles.less';

interface IconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
    size?: 'small' | 'large';
}

const createIcon = (src: string): React.FC<IconProps> =>
    ({
        className,
        size='small',
        ...props
    }) =>
        (<img
            {...props}
            className={classnames(
                styles.icon,
                className,
                {[styles.large]: size === 'large'},
            )}
            src={src}
        />);

import reloadImage from './images/reload.svg';
export const ReloadIcon = createIcon(reloadImage);

import addImage from './images/add.svg';
export const AddIcon = createIcon(addImage);

import exitImage from './images/exit.svg';
export const ExitIcon = createIcon(exitImage);
