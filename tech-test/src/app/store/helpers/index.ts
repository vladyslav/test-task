import { HttpErrorResponse } from '@angular/common/http';
import { ActionCreator, createAction } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';

export const getSuccessType = (actionType: string): string => `${actionType} Success`;
export const getFailureType = (actionType: string): string => `${actionType} Failure`;

export function createHTTPActions<RequestPayload = void, ResponsePayload = void, ErrorPayload = HttpErrorResponse>(
  actionType: string
): [
  ActionCreator<
    string,
    (props?: RequestPayload) => {
      payload: RequestPayload;
    } & TypedAction<string>
  >,
  ActionCreator<
    string,
    (props?: ResponsePayload) => {
      payload: ResponsePayload;
    } & TypedAction<string>
  >,
  ActionCreator<
    string,
    (props?: ErrorPayload) => {
      errorPayload: ErrorPayload;
    } & TypedAction<string>
  >
] {
  return [
    createAction(actionType, (payload: RequestPayload) => ({ payload })),
    createAction(getSuccessType(actionType), (payload?: ResponsePayload) => ({ payload })),
    createAction(getFailureType(actionType), (errorPayload: ErrorPayload) => ({ errorPayload }))
  ];
}
