import React from 'react';
import {useHistory} from 'react-router';
import {Grid} from 'react-flexbox-grid';

import {Button} from '@/uikit';
import {getUserAuthUrl} from '@/util/authenticate';

import {withAuthInfo} from './container';
import styles from './styles.less';
import topFigureSrc from './images/top_svg.svg';
import personPicture from './images/Group 66.svg';
import pathPicture from './images/path.svg';


type MainPageProps = {
    isAuthenticated: boolean;
}

const Main = ({
    isAuthenticated,
}: MainPageProps) => {
    const history = useHistory();

    return (
        <div className={styles.main}>
            <section className={styles.introSection}>
                <img src={topFigureSrc} className={styles.topFigure} />
                <img src={personPicture} className={styles.bottomFigure} />

                <Grid>
                    <div className={styles.introContent}>
                        <h1 className={styles.introHeadline}>{'Cистема администрирования вк-ботов'}</h1>
                        <p className={styles.introSubheadline}>{'Создайте вк-бота без программирования. Бесплатно.'}</p>

                        {isAuthenticated ?
                            (<Button className={styles.introButton} onClick={() => history.push('/bots')}>
                                {'Перейти к ботам'}
                            </Button>) :
                            (<Button className={styles.introButton} onClick={() => location.href = getUserAuthUrl()}>
                                {'Авторизоваться'}
                            </Button>)
                        }
                    </div>
                </Grid>
            </section>
            <section className={styles.pathSection}>
                <Grid>
                    <img src={pathPicture} className={styles.actionsPath} />
                </Grid>
            </section>
        </div>
    );
};

export default withAuthInfo(Main);
