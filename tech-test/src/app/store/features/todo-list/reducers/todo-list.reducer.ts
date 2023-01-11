import { Action, createReducer, on } from '@ngrx/store';
import update from 'immutability-helper';

import { Todo } from '@todo-list-feature/models/todo-list.models';
import * as TodoListActions from '@todo-list-feature/actions/todo-list.action';

const initialState: Todo[] = [];

const reducer = createReducer<Todo[]>(
  initialState,
  on(TodoListActions.getTodosSuccess, (state, { payload: { todos } }) => {
    return update(state, { $set: todos });
  }),
  on(TodoListActions.getTodosFailure, () => initialState)
);

export function todoListReducer(state: Todo[], action: Action) {
  return reducer(state, action);
}
