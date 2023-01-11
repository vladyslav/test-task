import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, exhaustMap, map } from 'rxjs/operators';

import { Todo } from '@todo-list-feature/models/todo-list.models';
import * as TodoListActions from '@todo-list-feature/actions/todo-list.action';
import { TodoListApiService } from '@todo-list-feature/services/todo-list-api.service';

@Injectable()
export class TodoListEffects {
  constructor(private actions$: Actions, private todoListApiService: TodoListApiService) {}

  public getTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoListActions.getTodos),
      exhaustMap(() =>
        this.todoListApiService.getTodos().pipe(
          map((todos: Todo[]) => TodoListActions.getTodosSuccess({ todos })),
          catchError((error: HttpErrorResponse) => of(TodoListActions.getTodosFailure(error)))
        )
      )
    )
  );

  public createTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoListActions.createTodo),
      exhaustMap(({ payload: { label } }) =>
        this.todoListApiService.createTodo(label).pipe(
          concatMap(() => [TodoListActions.createTodoSuccess(), TodoListActions.getTodos()]),
          catchError((error: HttpErrorResponse) => of(TodoListActions.createTodoFailure(error)))
        )
      )
    )
  );

  public updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoListActions.updateTodo),
      exhaustMap(({ payload: { id, label } }) =>
        this.todoListApiService.updateTodo({ id, label }).pipe(
          concatMap(() => [TodoListActions.updateTodoSuccess(), TodoListActions.getTodos()]),
          catchError((error: HttpErrorResponse) => of(TodoListActions.updateTodoFailure(error)))
        )
      )
    )
  );

  public completeTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoListActions.completeTodo),
      exhaustMap(({ payload: { id, done } }) =>
        this.todoListApiService.completeTodo({ id, done }).pipe(
          concatMap(() => [TodoListActions.completeTodoSuccess(), TodoListActions.getTodos()]),
          catchError((error: HttpErrorResponse) => of(TodoListActions.completeTodoFailure(error)))
        )
      )
    )
  );

  public deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoListActions.deleteTodo),
      exhaustMap(({ payload: { id } }) =>
        this.todoListApiService.deleteTodo(id).pipe(
          concatMap(() => [TodoListActions.deleteTodoSuccess(), TodoListActions.getTodos()]),
          catchError((error: HttpErrorResponse) => of(TodoListActions.deleteTodoFailure(error)))
        )
      )
    )
  );
}
