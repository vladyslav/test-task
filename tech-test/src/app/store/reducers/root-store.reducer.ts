import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';

import { RootState } from '@store/root-state';
import { environment } from '@environments/environment';

export function logger(reducer: ActionReducer<RootState>): ActionReducer<RootState> {
  return storeLogger({ collapsed: true })(reducer);
}

export const reducers: ActionReducerMap<RootState> = {};

export const metaReducers: Array<MetaReducer<RootState>> = environment.production ? [] : [logger];
