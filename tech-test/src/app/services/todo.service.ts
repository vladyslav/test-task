import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { throwError as observableThrowError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Todo } from '../interfaces/todo';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly API_URL: string = environment.apiUrl;

  public todos: Todo[] = [];

  constructor(private http: HttpClient) {
    this.todos = this.getTodos();
  }

  public getTodos(): Todo[] {
    this.http
      .get(this.API_URL)
      .pipe(
        catchError(this.errorHandler),
        tap((todos: Todo[]) => (this.todos = todos))
      )
      .subscribe();

    return this.todos;
  }

  public addTodo(label: string): void {
    this.http
      .post(this.API_URL, { label, done: false })
      .pipe(tap((todo: Todo) => this.todos.push(todo)))
      .subscribe();
  }

  public editTodo({ id, label, done }: Todo): void {
    this.http.patch(`${this.API_URL}/${id}`, { label, done }).subscribe();
  }

  public completeTodo({ id, done }: Todo): void {
    this.http.patch(`${this.API_URL}/${id}`, { done }).subscribe();
  }

  public deleteTodo(id: number): void {
    this.http.delete(`${this.API_URL}/${id}`).subscribe(() => {
      this.todos = this.todos.filter((todo: Todo) => todo.id !== id);
    });
  }

  private errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error.message || 'Something went wrong!');
  }
}
