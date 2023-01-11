import { combineReducers, StoreModule, Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TestBed } from '@angular/core/testing';

import { selectTodos } from '@todo-list-feature/selectors/todo-list.selectors';
import * as TodoListActions from '@todo-list-feature/actions/todo-list.action';
import { todoListReducers } from '@todo-list-feature/reducers/todo-list.reducers';
import { todoListFeatureName, TodoListState } from '@todo-list-feature/todo-list.state';
import { TodoListStoreService } from '@todo-list-feature/services/todo-list-store.service';

interface TodoListMockState {
  [todoListFeatureName]: TodoListState;
}

describe('TodoListStoreService', () => {
  const initialState = {};
  let store: MockStore<TodoListMockState>;
  let service: TodoListStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({ [todoListFeatureName]: combineReducers(todoListReducers) })],
      providers: [provideMockStore({ initialState })]
    });

    service = TestBed.inject(TodoListStoreService);
    store = TestBed.inject(Store) as MockStore<TodoListMockState>;
  });

  describe('getTodos()', () => {
    beforeEach(() => {
      spyOn(store, 'dispatch').and.callThrough();
    });

    it('should not dispatch action if not caused', () => {
      const action = TodoListActions.getTodos();

      expect(store.dispatch).not.toHaveBeenCalledWith(action);
    });

    it('should dispatch action when calling getTodos()', () => {
      const action = TodoListActions.getTodos();

      service.getTodos();

      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  describe('createTodo()', () => {
    beforeEach(() => {
      spyOn(store, 'dispatch').and.callThrough();
    });

    it('should not dispatch action if not caused', () => {
      const action = TodoListActions.createTodo({ label: 'label' });

      expect(store.dispatch).not.toHaveBeenCalledWith(action);
    });

    it('should dispatch action when calling createTodo()', () => {
      const action = TodoListActions.createTodo({ label: 'label' });

      service.createTodo('label');

      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  describe('updateTodo()', () => {
    beforeEach(() => {
      spyOn(store, 'dispatch').and.callThrough();
    });

    it('should not dispatch action if not caused', () => {
      const action = TodoListActions.updateTodo({ id: 3, label: 'label' });

      expect(store.dispatch).not.toHaveBeenCalledWith(action);
    });

    it('should dispatch action when calling updateTodo()', () => {
      const action = TodoListActions.updateTodo({ id: 3, label: 'label' });

      service.updateTodo({ id: 3, label: 'label' });

      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  describe('deleteTodo()', () => {
    beforeEach(() => {
      spyOn(store, 'dispatch').and.callThrough();
    });

    it('should not dispatch action if not caused', () => {
      const action = TodoListActions.deleteTodo({ id: 3 });

      expect(store.dispatch).not.toHaveBeenCalledWith(action);
    });

    it('should dispatch action when calling deleteTodo()', () => {
      const action = TodoListActions.deleteTodo({ id: 3 });

      service.deleteTodo(3);

      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  describe('selectTodos()', () => {
    beforeEach(() => {
      spyOn(store, 'select').and.callThrough();
    });

    it('should not call select if not caused', () => {
      const selector = selectTodos();

      expect(store.select).not.toHaveBeenCalledWith(selector);
    });

    it('should call select when calling selectTodos()', () => {
      service.selectTodos();

      expect(store.select).toHaveBeenCalled();
    });
  });
});
