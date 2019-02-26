import { combineReducers } from 'redux';
import { SCAN_CODE } from '../actions/barcodeActions';

const INITIAL_STATE = {
    qrCodeData: 'Please scan'
}

const barcodeReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SCAN_CODE:
            return {...state, qrCodeData: data}
        default:
            return state
    }
}

export default combineReducers({
    barcode: barcodeReducer,
})