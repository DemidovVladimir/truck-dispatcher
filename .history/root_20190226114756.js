import { combineEpics } from 'redux-observable';
import { scanCodeEpic } from './epics/BarcodeEpics';

export const rootEpic = combineEpics(
    scanCodeEpic
);
