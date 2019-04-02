import {SCAN_CODE, SCAN_CODE_FAILURE, SCAN_CODE_SUCCESS, scanCodeFailure} from "../actions/barcodeActions";
import {catchError, filter, map, mapTo, switchMap, tap} from "rxjs/operators";
import {of} from 'rxjs';
import NavigatorService from "../services/NavigatorService";
import {Auth} from "aws-amplify";

export const scanCodeEpic = action$ =>
    action$.pipe(
        filter(action => action.type === SCAN_CODE),
        tap(action => console.log(action.payload, '-  - - - - - - - - - -  - - -  - - - - - -- -- -- -- - STUFFFFF>>>>>......')),
        map(({payload}) => JSON.parse(payload)),
        tap(payload => console.log(payload, '-  - - - - - - - - - -  - - -  - - - - - -- -- -- -- - STUFFFFF>>>>>......')),
        switchMap(payload => of(Auth.signIn(payload.username, payload.password)).pipe(
            mapTo({type: SCAN_CODE_SUCCESS}),
            catchError(() => of(new scanCodeFailure()))
            )
        )
    );

export const scanCodeFailFeedbackEpic = action$ =>
    action$.pipe(
        filter(action => action.type === SCAN_CODE_FAILURE),
        mapTo(() => NavigatorService.navigate("Home"))
    );


export const scanCodeSuccessEpic = action$ =>
    action$.pipe(
        filter(action => action.type === SCAN_CODE_SUCCESS),
        mapTo(() => NavigatorService.navigate("Map"))
    );
