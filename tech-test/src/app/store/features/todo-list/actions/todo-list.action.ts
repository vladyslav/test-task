import { HttpErrorResponse } from '@angular/common/http';
import { createHTTPActions } from '@app/store/helpers';

import { Todo } from '@todo-list-feature/models/todo-list.models';

const todoListActionTypes = {
  getTodos: '[Todo List] Get todos',
  createTodo: '[Todo List] Create todo item',
  updateTodo: '[Todo List] Update todo item',
  completeTodo: '[Todo List] Complete todo item',
  deleteTodo: '[Todo List] Delete todo item'
};

export const [getTodos, getTodosSuccess, getTodosFailure] = createHTTPActions<
  null,
  { todos: Todo[] },
  HttpErrorResponse
>(todoListActionTypes.getTodos);

export const [createTodo, createTodoSuccess, createTodoFailure] = createHTTPActions<
  { label: string },
  void,
  HttpErrorResponse
>(todoListActionTypes.createTodo);

export const [updateTodo, updateTodoSuccess, updateTodoFailure] = createHTTPActions<
  { id: number; label: string },
  void,
  HttpErrorResponse
>(todoListActionTypes.updateTodo);

export const [completeTodo, completeTodoSuccess, completeTodoFailure] = createHTTPActions<
  { id: number; done: boolean },
  void,
  HttpErrorResponse
>(todoListActionTypes.completeTodo);

export const [deleteTodo, deleteTodoSuccess, deleteTodoFailure] = createHTTPActions<
  { id: number },
  void,
  HttpErrorResponse
>(todoListActionTypes.deleteTodo);
