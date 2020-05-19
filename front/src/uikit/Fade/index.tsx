import React, {useEffect, useRef} from 'react';

import styles from './styles.less';

type FadeProps = {
    children: React.ReactNode;
    duration: number;
}

const Fade: React.FC<FadeProps> = ({
    children,
    duration,
}) => {
    const fadeEl = useRef<HTMLDivElement | null>(null);

    useEffect(
        () => {
            fadeEl.current && fadeEl.current.style.setProperty('--animation-duration', `${duration}s`);
        },
        [fadeEl],
    );

    return (
        <div ref={fadeEl} className={styles.fade}>
            {children}
        </div>
    );
};

export default Fade;
