import { Component, OnInit, TrackByFunction } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DONE, EMPTY_LIST, EMPTY_NAME, GET_TODOS, TODO_CAPTION, TODO_TITLE } from 'src/app/constants';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  trackByTodo: TrackByFunction<Todo> = (index, todo) => todo;
  todos: Array<Todo> = new Array<Todo>();
  todoList: Array<Todo> = new Array<Todo>();
  todoTitle: string = TODO_TITLE;
  todoCaption: string = TODO_CAPTION;
  getTodos: string = GET_TODOS;
  todoForm!: FormGroup;
  errorMessage: any;
  username: string = '';
  isShowList: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private todoService: TodoService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.todoForm = this.formBuilder.group({
      userName: new FormControl('', Validators.required)
    });
  }

  addTask() {
    this.router.navigate(['manage']);
  }

  getTodoList() {
    this.username = this.todoForm.get('userName')?.value;
    this.errorMessage = !this.username ? EMPTY_NAME : '';
    if (!this.username) return;
    this.loadTodos().then((todos: any) => {
      this.errorMessage = todos.length > 0
        ? (this.todos = todos, '')
        : (this.todos = [], EMPTY_LIST);
      this.todoList = this.todos;
      this.isShowList = true;
    }).catch(error => {
      this.todos = [];
      this.errorMessage = error.error.message;
    });
    this.todoForm.reset();
  }

  loadTodos() {
    return new Promise((resolve, reject) => {
      this.todoService.getTodoList(this.username).subscribe({
        next: (todos: any) => resolve(todos),
        error: error => reject(error)
      });
    });
  }

  getTodosByStatus(status: boolean) {
    this.todoList = this.todos.filter(todo => todo.status === status);
  }

  getAllTodos() {
    this.todoList = this.todos;
  }

  goToHome() {
    this.isShowList = !this.isShowList;
  }

  updateStatus(todo: Todo) {
    todo.status = !todo.status;
    this.saveTodo(todo)
      .then((todos: any) => this.todoList = todos)
      .catch(error => this.errorMessage = error.error.message);
  }

  saveTodo(todo: Todo) {
    let userName = this.todoService.getUser();
    return new Promise((resolve, reject) => {
      this.todoService.saveTodo(todo, userName).subscribe({
        next: (todos: any) => resolve(todos),
        error: error => reject(error)
      });
    });
  }
}
