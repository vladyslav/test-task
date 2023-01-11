import { ActionReducerMap } from '@ngrx/store';

import { TodoListState } from '@todo-list-feature/todo-list.state';
import { todoListReducer } from '@todo-list-feature/reducers/todo-list.reducer';

export const todoListReducers: ActionReducerMap<TodoListState> = {
  todos: todoListReducer
};
