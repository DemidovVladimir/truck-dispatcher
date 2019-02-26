export const SCAN_CODE = 'SCAN_CODE';
export const SCAN_CODE_SUCCESS = 'SCAN_CODE_SUCCESS';
export const SCAN_CODE_FAILURE = 'SCAN_CODE_FAILURE';

export const scanCode = data => ({
    type: SCAN_CODE,
    payload: data
})

export const scanCodeSuccess = () => ({
    type: SCAN_CODE_SUCCESS
})

export const scanCodeFailure = () => ({
    type: SCAN_CODE_FAILURE
})