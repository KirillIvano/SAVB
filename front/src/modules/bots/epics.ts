import {Epic, combineEpics} from 'redux-observable';
import {filter, map, switchMap, mergeMap} from 'rxjs/operators';
import {from, of} from 'rxjs';
import {isOfType} from 'typesafe-actions';

import {RootAction, RootState} from '@/store/types';
import {getBots, createBot} from '@/services/bots/mock';
import {RawBotType} from '@/services/bots/dto';

import * as botsNames from './names';
import * as botsActions from './actions';
import {addPopupSuccessMessage, addPopupErrorMessage} from '../popup/actions';

const getBotsEpic: Epic<RootAction, RootAction, RootState> = action$ =>
    action$.pipe(
        filter(isOfType(botsNames.BOTS_GET_START)),
        switchMap(
            () => from(getBots()),
        ),
        map(
            res => res.ok ?
                botsActions.getBotsSuccessAction(res.data.bots.reduce(
                    (
                        acc: Record<string, RawBotType>,
                        bot,
                    ) => {
                        acc[String(bot.id)] = bot;
                        return acc;
                    }, {}),
                ) :
                botsActions.getBotsErrorAction(res.error),
        ),
    );

const createBotEpic: Epic<RootAction, RootAction, RootState> = action$ =>
    action$.pipe(
        filter(isOfType(botsNames.BOT_CREATE_START)),
        switchMap(
            ({payload}) => from(createBot(payload)).pipe(
                mergeMap(res => res.ok ?
                    of(
                        botsActions.createBotsSuccessAction(),
                        addPopupSuccessMessage('Бот был успешно создан!'),
                    ) :
                    of(
                        botsActions.createBotsErrorAction(res.error),
                        addPopupErrorMessage(res.error),
                    ),
                ),
            ),
        ),
    );

export default combineEpics(
    getBotsEpic,
    createBotEpic,
);
