import React from 'react';
import classnames from 'classnames';

import styles from './styles.less';

type LayoutContainerProps = React.HTMLAttributes<HTMLDivElement>;

const LayoutContainer: React.FC<LayoutContainerProps> = ({
    className,
    children,

    ...props
}) => (
    <div
        className={classnames(
            className,
            styles.container,
        )}
        {...props}
    >
        {children}
    </div>
);

export default LayoutContainer;
