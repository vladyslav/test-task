import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TodoItemComponent } from '@todo-list/components';
import { TodoListStoreService } from '@todo-list-feature/services/todo-list-store.service';

const TodoListStoreServiceMock = {
  updateTodo: () => {},
  completeTodo: () => {},
  deleteTodo: () => {}
};

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

  let todoListStoreService: TodoListStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [TodoItemComponent],
      providers: [{ provide: TodoListStoreService, useValue: TodoListStoreServiceMock }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    todoListStoreService = TestBed.inject(TodoListStoreService);

    component.todo = {
      done: false,
      id: 3,
      label: 'label'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit() should call labelControl.setValue', () => {
    // Arrange
    spyOn(component.labelControl, 'setValue');
    // Act
    component.ngOnInit();
    // Assert
    expect(component.labelControl.setValue).toHaveBeenCalledTimes(1);
    expect(component.labelControl.setValue).toHaveBeenCalledWith(component.todo.label);
  });

  describe('edit()', () => {
    it('should set isEditing to false', () => {
      // Act
      component.edit();
      // Assert
      expect(component.isEditing).toBeFalsy();
    });

    it('should call delete()', () => {
      // Arrange
      spyOn(component, 'delete');
      component.labelControl.setValue('');
      // Act
      component.edit();
      // Assert
      expect(component.delete).toHaveBeenCalledTimes(1);
      expect(component.delete).toHaveBeenCalledWith();
    });

    it('should call todoListStoreService.updateTodo()', () => {
      // Arrange
      spyOn(todoListStoreService, 'updateTodo');
      const id = component.todo.id;
      component.labelControl.setValue('newLabel');
      const label = component.labelControl.value;
      // Act
      component.edit();
      // Assert
      expect(todoListStoreService.updateTodo).toHaveBeenCalledTimes(1);
      expect(todoListStoreService.updateTodo).toHaveBeenCalledWith({ id, label });
    });
  });

  it('complete() should call todoListStoreService.completeTodo', () => {
    // Arrange
    spyOn(todoListStoreService, 'completeTodo');
    const id = component.todo.id;
    const done = !component.todo.done;
    // Act
    component.complete();
    // Assert
    expect(todoListStoreService.completeTodo).toHaveBeenCalledTimes(1);
    expect(todoListStoreService.completeTodo).toHaveBeenCalledWith({ id, done });
  });

  it('delete() should call todoListStoreService.deleteTodo', () => {
    // Arrange
    spyOn(todoListStoreService, 'deleteTodo');
    const id = component.todo.id;
    // Act
    component.delete();
    // Assert
    expect(todoListStoreService.deleteTodo).toHaveBeenCalledTimes(1);
    expect(todoListStoreService.deleteTodo).toHaveBeenCalledWith(id);
  });

  it('initEditing() should set isEditing to true', () => {
    // Act
    component.initEditing();
    // Assert
    expect(component.isEditing).toBeTruthy();
  });

  describe('cancelEditing()', () => {
    beforeEach(() => {
      // Arrange
      spyOn(component.labelControl, 'setValue');
      // Act
      component.cancelEditing();
    });

    it('should call labelControl.setValue', () => {
      // Assert
      expect(component.labelControl.setValue).toHaveBeenCalledTimes(1);
      expect(component.labelControl.setValue).toHaveBeenCalledWith(component.todo.label);
    });

    it('should set isEditing to true', () => {
      // Assert
      expect(component.isEditing).toBeFalsy();
    });
  });
});
