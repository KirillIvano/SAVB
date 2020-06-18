import {Epic, combineEpics} from 'redux-observable';
import {from, of} from 'rxjs';
import {
    switchMap,
    mergeMap,
    filter,
} from 'rxjs/operators';
import {isOfType} from 'typesafe-actions';

import {RootAction, RootState} from '@/store/types';
import {getAllBotStages} from '@/services/stages';
import {getFullStage} from '@/services/stages/mock';
import {clientifyStagesPreviews, clientifyStage} from '@/modules/stages/transformers';
import {clientifyTriggerPreviewsArr} from '@/modules/triggers/transformers';
import {retryAction} from '@/modules/user/helpers';

import * as names from './names';
import {
    getAllBotStagesErrorAction,
    getAllBotStagesSuccessAction,
    getStageSuccessAction,
    getStageErrorAction,
} from './actions';

const getStageEpic: Epic<RootAction, RootAction, RootState> = action$ =>
    action$.pipe(
        filter(isOfType(names.GET_STAGE_START)),
        switchMap(
            ({payload: {stageId}}) =>
                from(getFullStage(+stageId)).pipe(
                    mergeMap(
                        response => {
                            if (!response.ok) {
                                return of(
                                    getStageErrorAction(response.error),
                                );
                            }

                            const {data} = response;

                            const successPayload = {
                                presentStage: clientifyStage(data.presentStage),
                                nextStages: clientifyStagesPreviews(data.nextStages),
                                triggersPreviews: clientifyTriggerPreviewsArr(data.triggersPreviews),
                            };

                            return of(
                                getStageSuccessAction(successPayload),
                            );
                        },
                    ),
                ),
        ),
    );

const getAllBotStagesEpic: Epic<RootAction, RootAction, RootState> = action$ =>
    action$.pipe(
        filter(isOfType(names.GET_ALL_BOT_STAGES_START)),
        switchMap(
            src => from(
                getAllBotStages(+src.payload.botId),
            ).pipe(
                mergeMap(response => {
                    if (response.status === 401) {
                        return of(retryAction(src));
                    }

                    if (!response.ok) {
                        return of(getAllBotStagesErrorAction(
                            response.error,
                        ));
                    }



                    return of(
                        getAllBotStagesSuccessAction(
                            clientifyStagesPreviews(response.data.stages),
                        ),
                    );
                }),
            ),
        ),
    );

export const stagesEpic = combineEpics(
    getStageEpic,
    getAllBotStagesEpic,
);
