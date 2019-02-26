export const SCAN_CODE = 'SCAN_CODE';
export const SCAN_CODE_SUCCESS = 'SCAN_CODE_SUCCESS';
export const SCAN_CODE_FAILURE = 'SCAN_CODE_FAILURE';

export const scanCodeSuccess = () => ({
    type: SCAN_CODE_SUCCESS
})

export const scanCodeFailure = () => ({
    type: SCAN_CODE_FAILURE
})

export const scanCode = action$ => action$.pipe(
    filter(action => action.type === SCAN_CODE),
    delay(500),
    mapTo({ type: SCAN_CODE_SUCCESS })
  );