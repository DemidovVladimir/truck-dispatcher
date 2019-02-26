import { combineReducers } from 'redux';

const INITIAL_STATE = {
    qrCodeData: 'Please scan'
}

const barcodeReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state
    }
}