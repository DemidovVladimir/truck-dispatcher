import { combineReducers } from 'redux';
import { SCAN_CODE, SCAN_CODE_SUCCESS, SCAN_CODE_FAILURE } from '../actions/barcodeActions';

const INITIAL_STATE = {
    qrCodeData: 'Please scan',
    scanned: false
}

const barcodeReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SCAN_CODE:
            return {...state, qrCodeData: action.payload};
        case SCAN_CODE_SUCCESS:
            return {...state, scanned: true}
        case SCAN_CODE_FAILURE:
            return {...state, scanned: false}
        default:
            return state
    }
}

export default combineReducers({
    barcode: barcodeReducer,
})