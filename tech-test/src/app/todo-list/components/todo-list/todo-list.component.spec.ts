import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TodoListComponent } from '@todo-list/components';
import { TodoListStoreService } from '@todo-list-feature/services/todo-list-store.service';

const TodoListStoreServiceMock = {
  createTodo: () => {},
  getTodos: () => {},
  selectTodos: () => {}
};

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  let todoListStoreService: TodoListStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [TodoListComponent],
      providers: [{ provide: TodoListStoreService, useValue: TodoListStoreServiceMock }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    todoListStoreService = TestBed.inject(TodoListStoreService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit() should call todoListStoreService.getTodos', () => {
    // Arrange
    spyOn(todoListStoreService, 'getTodos');
    // Act
    component.ngOnInit();
    // Assert
    expect(todoListStoreService.getTodos).toHaveBeenCalledTimes(1);
  });

  describe('createTodo()', () => {
    it('should NOT call todoListStoreService.createTodo()', () => {
      // Arrange
      spyOn(todoListStoreService, 'createTodo');
      component.todoTitle = '';
      // Act
      component.createTodo();
      // Assert
      expect(todoListStoreService.createTodo).not.toHaveBeenCalledTimes(1);
    });

    it('should call todoListStoreService.createTodo()', () => {
      // Arrange
      spyOn(todoListStoreService, 'createTodo');
      component.todoTitle = '333';
      // Act
      component.createTodo();
      // Assert
      expect(todoListStoreService.createTodo).toHaveBeenCalledTimes(1);
      expect(todoListStoreService.createTodo).toHaveBeenCalledWith('333');
    });

    it('should set todoTitle to ""', () => {
      // Arrange
      component.todoTitle = '333';
      // Act
      component.createTodo();
      // Assert
      expect(component.todoTitle).toBe('');
    });
  });
});
