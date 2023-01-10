import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TodoItemComponent } from './todo-item.component';
import { TodoService } from '../../services/todo.service';

const todo = { id: 1, done: false, label: 'label' };

const TodoServiceMock = {
  editTodo: () => {},
  completeTodo: () => {},
  deleteTodo: () => {}
};

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

  let todoService: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [TodoItemComponent],
      providers: [{ provide: TodoService, useValue: TodoServiceMock }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService);

    component.todo = {
      done: false,
      id: 3,
      label: 'label'
    };
    fixture.detectChanges();
  });

  afterEach(() => {});

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('edit()', () => {
    it('should set isEditing to false', () => {
      // Act
      component.edit(todo);
      // Assert
      expect(component.isEditing).toBeFalsy();
    });

    it('should call delete()', () => {
      // Arrange
      todo.label = '';
      spyOn(component, 'delete');
      // Act
      component.edit(todo);
      // Assert
      expect(component.delete).toHaveBeenCalledTimes(1);
      expect(component.delete).toHaveBeenCalledWith(todo.id);
    });

    it('should call todoService.editTodo()', () => {
      // Arrange
      todo.label = '123';
      spyOn(todoService, 'editTodo');
      // Act
      component.edit(todo);
      // Assert
      expect(todoService.editTodo).toHaveBeenCalledTimes(1);
      expect(todoService.editTodo).toHaveBeenCalledWith(todo);
    });
  });

  it('complete() should call todoService.completeTodo', () => {
    // Act
    spyOn(todoService, 'completeTodo');
    component.complete(todo);
    // Assert
    expect(todoService.completeTodo).toHaveBeenCalledTimes(1);
    expect(todoService.completeTodo).toHaveBeenCalledWith(todo);
  });

  it('delete() should call todoService.deleteTodo', () => {
    // Act
    spyOn(todoService, 'deleteTodo');
    component.delete(todo.id);
    // Assert
    expect(todoService.deleteTodo).toHaveBeenCalledTimes(1);
    expect(todoService.deleteTodo).toHaveBeenCalledWith(todo.id);
  });

  describe('initEditing()', () => {
    beforeEach(() => {
      // Act
      component.initEditing(todo);
    });

    it('should set cachedTodoLabel to todo.label', () => {
      // Assert
      expect(component['cachedTodoLabel']).toBe(todo.label);
    });

    it('should set isEditing to true', () => {
      // Assert
      expect(component.isEditing).toBeTruthy();
    });
  });

  describe('cancelEditing()', () => {
    beforeEach(() => {
      // Arrange
      component['cachedTodoLabel'] = '333';
      // Act
      component.cancelEditing(todo);
    });

    it('should set todo.label to cachedTodoLabel', () => {
      // Assert
      expect(todo.label).toBe(component['cachedTodoLabel']);
    });

    it('should set isEditing to true', () => {
      // Assert
      expect(component.isEditing).toBeFalsy();
    });
  });
});
