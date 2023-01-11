import { selectTodos } from '@todo-list-feature/selectors/todo-list.selectors';
import { todoListFeatureName, TodoListState } from '@todo-list-feature/todo-list.state';

interface TodoListMockState {
  [todoListFeatureName]: TodoListState;
}

const state: TodoListMockState = {
  [todoListFeatureName]: {
    todos: []
  }
};

describe('Todo List Selectors tests', () => {
  it('selectTodos works correctly', () => {
    expect(selectTodos()(state as any)).toEqual([]);
  });
});
