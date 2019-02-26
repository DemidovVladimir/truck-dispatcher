import { combineEpics } from 'redux-observable';
import { scanCodeEpic } from './epics/BarcodeEpics';

export default combineEpics(
    scanCodeEpic,
);
