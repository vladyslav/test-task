import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { TodoService } from './todo.service';

const HttpClientMock = {
  get: () => of({}),
  post: () => of({}),
  patch: () => of({}),
  delete: () => of({})
};

describe('TodoService', () => {
  let service: TodoService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoService, { provide: HttpClient, useValue: HttpClientMock }]
    });

    service = TestBed.inject(TodoService);
    service.todos = [];

    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getTodos()', () => {
    // Arrange
    spyOn(httpClient, 'get').and.returnValue(of([]));
    // Act
    const result = service.getTodos();
    // Assert
    expect(httpClient.get).toHaveBeenCalledWith('http://localhost:3000/tasks');
    expect(result).toEqual([]);
  });

  it('addTodo()', () => {
    // Arrange
    spyOn(httpClient, 'post').and.callThrough();
    const label = 'label';
    // Act
    const result = service.addTodo(label);
    // Assert
    expect(httpClient.post).toHaveBeenCalledWith('http://localhost:3000/tasks', { label, done: false });
    expect(result).toBeUndefined([]);
  });

  it('editTodo()', () => {
    // Arrange
    spyOn(httpClient, 'patch').and.callThrough();
    const label = 'label';
    const id = 3;
    const done = false;
    // Act
    const result = service.editTodo({ id, label, done });
    // Assert
    expect(httpClient.patch).toHaveBeenCalledWith(`http://localhost:3000/tasks/${id}`, { label, done });
    expect(result).toBeUndefined([]);
  });

  it('completeTodo()', () => {
    // Arrange
    spyOn(httpClient, 'patch').and.callThrough();
    const label = 'label';
    const id = 3;
    const done = false;
    // Act
    const result = service.completeTodo({ id, label, done });
    // Assert
    expect(httpClient.patch).toHaveBeenCalledWith(`http://localhost:3000/tasks/${id}`, { done });
    expect(result).toBeUndefined([]);
  });

  it('deleteTodo()', () => {
    // Arrange
    spyOn(httpClient, 'delete').and.callThrough();
    const id = 3;
    // Act
    const result = service.deleteTodo(id);
    // Assert
    expect(httpClient.delete).toHaveBeenCalledWith(`http://localhost:3000/tasks/${id}`);
    expect(result).toBeUndefined([]);
  });
});
