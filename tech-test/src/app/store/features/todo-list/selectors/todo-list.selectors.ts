import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import { Todo } from '@todo-list-feature/models/todo-list.models';
import { todoListFeatureName, TodoListState } from '@todo-list-feature/todo-list.state';

export const selectTodoListState = createFeatureSelector<TodoListState>(todoListFeatureName);

export const selectTodos: () => MemoizedSelector<TodoListState, Todo[] | []> = () =>
  createSelector(selectTodoListState, (state: TodoListState) => state.todos || []);
