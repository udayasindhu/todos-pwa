export interface Todo {
    name: string;
    status: boolean;
}

export interface User {
    user: string;
}

export interface UserTodos extends User {
    todos: Array<Todo>;
}