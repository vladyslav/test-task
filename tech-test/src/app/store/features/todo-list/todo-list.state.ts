import { Todo } from '@todo-list-feature/models/todo-list.models';

export const todoListFeatureName = 'todo-list';

export interface TodoListState {
  todos: Todo[];
}
