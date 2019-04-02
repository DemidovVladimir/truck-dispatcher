import { combineEpics } from 'redux-observable';
import { scanCodeEpic, scanCodeSuccessEpic, scanCodeFailFeedbackEpic } from './epics/BarcodeEpics';

export default combineEpics(
    scanCodeEpic,
    scanCodeSuccessEpic,
    scanCodeFailFeedbackEpic
);
