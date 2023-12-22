import { Component, OnInit, TrackByFunction } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY_LIST, EMPTY_TITLE, Status } from 'src/app/constants';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-manage',
  templateUrl: './todo-manage.component.html',
  styleUrls: ['./todo-manage.component.scss']
})
export class TodoManageComponent implements OnInit {

  trackByTodo: TrackByFunction<Todo> = (index, todo) => todo;
  onlineOffline: boolean = navigator.onLine;
  todoList: Array<Todo> = new Array<Todo>();
  todo: Todo = { name: '', status: false };
  errorMessage: any = EMPTY_LIST;
  addTodoForm!: FormGroup;
  userName: string = "";
  todoStatusList = [Status.IN_PROGRESS, Status.DONE];
  emptyerrorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userName = sessionStorage.getItem('username') ?? '';
    this.initForm();
    this.getTodoList();
  };

  initForm() {
    this.addTodoForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      status: new FormControl(Status.IN_PROGRESS)
    });
  }

  addTask() {
    const name = this.addTodoForm.get('name')?.value;
    const status: Status = this.addTodoForm.get('status')?.value as Status;
    this.todo = {
      name,
      status: status === Status.DONE
    };
    this.emptyerrorMessage = !this.todo.name ? EMPTY_TITLE : '';
    if (!this.todo.name) return;
    this.buildTodos(this.todo);
    this.addTodoForm.get('name')?.setValue('');
  }

  saveTodo(todo: Todo) {
    return new Promise((resolve, reject) => {
      this.todoService.saveTodo(todo, this.userName).subscribe({
        next: (todos: any) => resolve(todos),
        error: error => reject(error)
      });
    });
  }

  goToHome() {
    this.router.navigate(['list']);
  }

  buildTodos(todo: Todo) {
    this.saveTodo(todo)
      .then((todos: any) => this.todoList = todos)
      .catch(error => this.errorMessage = error.error.message);
  }

  updateStatus(todo: Todo) {
    todo.status = !todo.status;
    this.buildTodos(todo);
  }

  getTodoList() {
    this.loadTodos().then((todos: any) => {
      this.errorMessage = todos.length > 0
        ? (this.todoList = todos, '')
        : (this.todoList = [], EMPTY_LIST);
    }).catch(error => {
      this.todoList = [];
      this.errorMessage = error.error.message;
    });
  }

  loadTodos() {
    return new Promise((resolve, reject) => {
      this.todoService.getTodoList(this.userName).subscribe({
        next: (todos: any) => resolve(todos),
        error: error => reject(error)
      });
    });
  }
}
