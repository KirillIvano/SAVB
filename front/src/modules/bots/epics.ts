import {Epic, combineEpics} from 'redux-observable';
import {filter, map, switchMap} from 'rxjs/operators';
import {from} from 'rxjs';
import {isOfType} from 'typesafe-actions';

import {RootAction, RootState} from '@/store/types';
import {getBots, createBot} from '@/services/bots/mock';
import {RawBotType} from '@/services/bots/dto';

import * as botsNames from './names';
import * as botsActions from './actions';

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
            () => from(createBot()).pipe(
                map(res => res.ok ?
                    botsActions.createBotsSuccessAction() :
                    botsActions.createBotsErrorAction(res.error),
                ),
            ),
        ),
    );

export default combineEpics(
    getBotsEpic,
    createBotEpic,
);
