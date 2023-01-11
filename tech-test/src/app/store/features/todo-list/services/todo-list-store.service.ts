import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Todo } from '@todo-list-feature/models/todo-list.models';
import { TodoListState } from '@todo-list-feature/todo-list.state';
import * as TodoListActions from '@todo-list-feature/actions/todo-list.action';
import { selectTodos } from '@todo-list-feature/selectors/todo-list.selectors';

@Injectable({
  providedIn: 'root'
})
export class TodoListStoreService {
  constructor(private store: Store<TodoListState>) {}

  public getTodos(): void {
    this.store.dispatch(TodoListActions.getTodos());
  }

  public createTodo(label: string): void {
    this.store.dispatch(TodoListActions.createTodo({ label }));
  }

  public updateTodo({ id, label }: { id: number; label: string }): void {
    this.store.dispatch(TodoListActions.updateTodo({ id, label }));
  }

  public completeTodo({ id, done }: { id: number; done: boolean }): void {
    this.store.dispatch(TodoListActions.completeTodo({ id, done }));
  }

  public deleteTodo(id: number): void {
    this.store.dispatch(TodoListActions.deleteTodo({ id }));
  }

  // Selectors
  public selectTodos(): Observable<Todo[]> {
    return this.store.select(selectTodos());
  }
}
