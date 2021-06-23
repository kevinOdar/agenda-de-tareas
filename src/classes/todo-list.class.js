export class TodoList {
    constructor() {
        this.todos = [];
    }

    nuevoTodo(todo) {
        this.todos.push(todo);
    }

    eliminarTodo(id) {
        this.todos = this.todos.filter(todo => todo.id != id);
    }

    marcarCompletado(id) {
        this.todos.find(todo => todo.id == id).completado = true;
    }

    eliminarCompletados() {
        this.todos = this.todos.filter(todo => !todo.completado);
    }
}