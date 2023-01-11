import { todoListReducer } from '@todo-list-feature/reducers/todo-list.reducer';
import * as TodoListActions from '@todo-list-feature/actions/todo-list.action';

describe('todoListReducer', () => {
  const initialState = [];

  describe('unknown action', () => {
    it('should return the default state', () => {
      const action = { type: 'Unknown' };

      const state = todoListReducer(initialState, action);
      expect(state).toBe(initialState);
    });
  });

  describe('getTodosSuccess action', () => {
    it('should return Todo[] and update the state', () => {
      const todos = [];
      const params = { todos };

      const action = TodoListActions.getTodosSuccess(params);
      const result = todoListReducer(initialState, action);

      expect(result).toEqual([]);
    });
  });
});
