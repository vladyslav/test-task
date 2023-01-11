import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { Observable, of } from 'rxjs';
import { cold, hot } from 'jasmine-marbles';
import { provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import * as TodoListActions from '@todo-list-feature/actions/todo-list.action';
import { TodoListEffects } from '@todo-list-feature/effects/todo-list.effects';
import { TodoListApiService } from '@todo-list-feature/services/todo-list-api.service';

describe('TodoListEffects', () => {
  let effects: TodoListEffects;
  let actions$: Observable<any>;
  let todoListApiService: TodoListApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoListEffects, TodoListApiService, provideMockActions(() => actions$), provideMockStore({})]
    });

    effects = TestBed.inject<TodoListEffects>(TodoListEffects);
    todoListApiService = TestBed.inject(TodoListApiService);
  });

  it('should be correctly injected', () => {
    expect(effects).toBeTruthy();
  });

  describe('getTodos$', () => {
    it('should return list of todos', () => {
      spyOn(todoListApiService, 'getTodos').and.callFake(() => of([]));

      const action = TodoListActions.getTodos();
      const completion = TodoListActions.getTodosSuccess({
        todos: []
      });

      actions$ = hot('--a-', { a: action });
      const expected = cold('--(b)', { b: completion });

      expect(effects.getTodos$).toBeObservable(expected);
    });

    it('should call error action', () => {
      const errorPayload = new HttpErrorResponse({ error: { message: 'Error' } });

      const action = TodoListActions.getTodos();
      const completion = TodoListActions.getTodosFailure(errorPayload);

      actions$ = hot('-a|', { a: action });
      const response = cold('-#|)', {}, errorPayload);
      spyOn(todoListApiService, 'getTodos').and.callFake(() => response);
      const expected = cold('--(b|)', { b: completion });

      expect(effects.getTodos$).toBeObservable(expected);
    });
  });
});
