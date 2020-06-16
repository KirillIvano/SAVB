import React from 'react';
import classnames from 'classnames';

import styles from './styles.less';

type SidePanelProps = {
    width?: number;
    className?: string;
    children: React.ReactNode;
}

const SidePanel = ({
    width=300,
    className,
    children,
}: SidePanelProps) => (
    <div
        style={{flex: `0 0 ${width}px`}}
        className={styles.panelPlaceholder}
    >
        <div
            style={{width: `${width}px`}}
            className={classnames(styles.panel, className)}
        >
            {children}
        </div>
    </div>
);

const SidePaneledRest = ({
    children,
    className,
}: {children: React.ReactNode; className?: string}) => (
    <div className={classnames(styles.content, className)}>
        {children}
    </div>
);

const SidePaneledLayout = ({
    children,
}: {children: React.ReactNode}) => (
    <div className={styles.sidePaneledLayout}>
        {children}
    </div>
);

export const SidePanelComp = React.memo(SidePanel);
export const SidePaneledRestComp = React.memo(SidePaneledRest);
export const SidePaneledLayoutComp = React.memo(SidePaneledLayout);
