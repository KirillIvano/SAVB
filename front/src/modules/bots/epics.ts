import {createEpicMiddleware, ofType, Epic, combineEpics} from 'redux-observable';
import {mergeMap, filter, tap, map} from 'rxjs/operators';
import {from} from 'rxjs';
import {isOfType} from 'typesafe-actions';

import {RootAction, RootState} from '@/store/types';
import {uselessAction} from '@/store/actions';
import {getBots} from '@/services/bots/mock';

import * as botsNames from './names';
import * as botsActions from './actions';
import { RawBotType } from '@/services/bots/dto';

const getBotsEpic: Epic<RootAction, RootAction, RootState> = action$ =>
    action$.pipe(
        filter(isOfType(botsNames.BOTS_GET_START)),
        mergeMap(
            () => from(getBots()),
        ),
        map(
            bots => bots.ok ?
                botsActions.getBotsSuccessAction(bots.data.bots.reduce(
                    (
                        acc: Record<string, RawBotType>,
                        bot,
                    ) => {
                        acc[String(bot.id)] = bot;
                        return acc;
                    }, {}),
                ) :
                botsActions.getBotsErrorAction(bots.error),
        ),
    );

export default combineEpics(getBotsEpic);
