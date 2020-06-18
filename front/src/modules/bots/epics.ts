import {Epic, combineEpics} from 'redux-observable';
import {filter, switchMap, mergeMap} from 'rxjs/operators';
import {from, of} from 'rxjs';
import {isOfType} from 'typesafe-actions';

import {RootAction, RootState} from '@/store/types';
import {createBot, getBots, getSingleBot, deleteBot} from '@/services/bots';
import {retryAction} from '@/modules/user/helpers';
import {addPopupSuccessMessage, addPopupErrorMessage} from '@/modules/popup/actions';

import * as botsNames from './names';
import * as botsActions from './actions';
import {clientifyBot, clientifyBotsArr} from './transformers';

const getBotsEpic: Epic<RootAction, RootAction, RootState> = action$ =>
    action$.pipe(
        filter(isOfType(botsNames.BOTS_GET_START)),
        switchMap(
            src => from(getBots()).pipe(
                mergeMap(
                    res => {
                        if (res.status === 401) {
                            return of(retryAction(src));
                        }

                        if (!res.ok) {
                            return of(botsActions.getBotsErrorAction(res.error));
                        }

                        return of(
                            botsActions.getBotsSuccessAction(
                                clientifyBotsArr(res.data.bots),
                            ),
                        );
                    },
                ),
            ),
        ),
    );



const getSingleBotEpic: Epic<RootAction, RootAction, RootState> = action$ =>
    action$.pipe(
        filter(isOfType(botsNames.BOT_GET_SINGLE_START)),
        switchMap(
            src => from(getSingleBot(src.payload)).pipe(
                mergeMap(res => {
                    if (res.status === 401) {
                        return of(retryAction(src));
                    }

                    return  res.ok ?
                        of(
                            botsActions.getSingleBotSuccessAction(
                                clientifyBot(res.data.bot),
                            ),
                        ) :
                        of(
                            botsActions.getSingleBotErrorAction(res.error),
                            addPopupErrorMessage(res.error),
                        );
                }),
            ),
        ),
    );


const deleteBotEpic: Epic<RootAction, RootAction, RootState> = action$ =>
    action$.pipe(
        filter(isOfType(botsNames.DELETE_BOT_START)),
        switchMap(
            src => from(deleteBot(src.payload.botId)).pipe(
                mergeMap(res => {
                    if (res.status === 401) {
                        return of(retryAction(src));
                    }

                    return  res.ok ?
                        of(
                            botsActions.deleteBotSuccessAction(src.payload.botId),
                            addPopupSuccessMessage('Группа успешно удалена'),
                        ) :
                        of(
                            botsActions.deleteBotErrorAction(res.error),
                            addPopupErrorMessage(res.error),
                        );
                }),
            ),
        ),
    );

const createBotEpic: Epic<RootAction, RootAction, RootState> = action$ =>
    action$.pipe(
        filter(isOfType(botsNames.BOT_CREATE_START)),
        switchMap(
            src => from(createBot(src.payload)).pipe(
                mergeMap(res => {
                    if (res.status === 401) {
                        return of(retryAction(src));
                    }

                    return res.ok ?
                        of(
                            botsActions.createBotsSuccessAction(),
                            addPopupSuccessMessage('Бот был успешно создан!'),
                        ) :
                        of(
                            botsActions.createBotsErrorAction(res.error),
                            addPopupErrorMessage(res.error),
                        );
                }),
            ),
        ),
    );

export const botsEpic = combineEpics(
    getBotsEpic,
    getSingleBotEpic,
    deleteBotEpic,
    createBotEpic,
);
