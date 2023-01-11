import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { Todo } from '@todo-list-feature/models/todo-list.models';

@Injectable({
  providedIn: 'root'
})
export class TodoListApiService {
  private readonly API_URL: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.API_URL);
  }

  public createTodo(label: string): Observable<void> {
    return this.http.post<void>(this.API_URL, { label, done: false });
  }

  public updateTodo({ id, label }: { id: number; label: string }): Observable<void> {
    return this.http.patch<void>(`${this.API_URL}/${id}`, { label });
  }

  public completeTodo({ id, done }: { id: number; done: boolean }): Observable<void> {
    return this.http.patch<void>(`${this.API_URL}/${id}`, { done });
  }

  public deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
