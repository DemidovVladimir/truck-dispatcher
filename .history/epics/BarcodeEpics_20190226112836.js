import { SCAN_CODE, SCAN_CODE_SUCCESS } from "../actions/barcodeActions";
import {filter, delay, mapTo} form 'rxjs/operators';

export const scanCode = action$ =>
  action$.pipe(
    filter(action => action.type === SCAN_CODE),
    delay(500),
    mapTo({ type: SCAN_CODE_SUCCESS })
  );
