import React, {useRef, useEffect, useState} from 'react';
import {Subtract} from 'utility-types';

import styles from './styles.less';

type AdditionalProps = {
    scrollRef: React.Ref<HTMLDivElement>;
}

export const withVerticalScroll = <TProps extends AdditionalProps>(Comp: React.ComponentType<TProps>) =>
    (props: Subtract<TProps, AdditionalProps>) => {
        const [isBottomShadowVisible, setBottomShadowVisibility] = useState(true);
        const [isTopShadowVisible, setTopShadowVisibility] = useState(false);

        const ref = useRef<HTMLDivElement>();

        useEffect(() => {
            if (ref.current) {
                const {current} = ref;

                const scrollListener = (e: Event) => {
                    const target = e.target as HTMLDivElement;
                    const {scrollTop, clientHeight, scrollHeight} = target;

                    if (target.scrollTop === 0) {
                        setTopShadowVisibility(false);
                    } else {
                        setTopShadowVisibility(true);
                    }

                    const isScrolledToBottom = scrollTop + clientHeight >= scrollHeight - 10;

                    if (isScrolledToBottom) {
                        setBottomShadowVisibility(false);
                    } else {
                        setBottomShadowVisibility(true);
                    }
                };

                current.addEventListener('scroll', scrollListener);

                return () => current.removeEventListener('scroll', scrollListener);
            }
        }, [ref.current]);

        return (<div className={styles.shadowedWrapper} data-kek="asdasd">
            <div hidden={!isTopShadowVisible} className={styles.topShadow} />
            <Comp {...props as TProps} scrollRef={ref} />
            <div hidden={!isBottomShadowVisible} className={styles.bottomShadow} />
        </div>);
    };
