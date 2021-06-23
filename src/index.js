import './styles.css';
// import './assets/descarga.png';
import { Todo, TodoList } from './classes';
import { crearTodoHTML } from './js/components';

const miModulo = (() => {
    'use strict';
    let inputPalabraEscrita = document.querySelector('.new-todo'),
        clearButton = document.querySelector('.clear-completed'),
        filtros = document.querySelectorAll('.filters .filtro');

    let ulElement = document.querySelector('.todo-list');

    const todoList = new TodoList();

    const manejoDeEventos = () => {
        inputPalabraEscrita.addEventListener('keydown', e => {
            if (e.key === 'Enter' && inputPalabraEscrita.value.length > 0) {
                const todo = new Todo(inputPalabraEscrita.value);
                todoList.nuevoTodo(todo);
                localStorage.setItem(todo.id, todo.tarea);
                crearTodoHTML(todo);
                inputPalabraEscrita.value = '';
            }
        })

        clearButton.addEventListener('click', () => {
            [...ulElement.children].forEach(liElement => {
                if (liElement.classList.contains('completed')) {
                    localStorage.removeItem(liElement.getAttribute('data-id'));
                    liElement.remove();
                }
            });
            todoList.eliminarCompletados();
        })

        window.addEventListener('DOMContentLoaded', () => {
            for (let i = 0; i < localStorage.length; i++) {
                let todo = new Todo(localStorage.getItem(localStorage.key(i)));
                todo.id = localStorage.key(i);
                crearTodoHTML(todo);
                todoList.nuevoTodo(todo);
            }
        })

        filtros.forEach(filtro => {
            filtro.addEventListener('click', () => {
                [...ulElement.children].forEach(liElement => {
                    let completado = liElement.classList.contains('completed')
                    switch (filtro.textContent) {
                        case 'Pendientes':
                            completado ? liElement.classList.add('hidden') : liElement.classList.remove('hidden');
                            break;
                        case 'Completados':
                            !completado ? liElement.classList.add('hidden') : liElement.classList.remove('hidden');
                            break;
                        default:
                            liElement.classList.remove('hidden');
                            break;
                    }
                    filtros.forEach(filtro => filtro.classList.remove('selected'));
                    filtro.classList.add('selected');

                })
            });
        });
    }

    const inicializacion = () => {
        manejoDeEventos();
    
    }

    inicializacion();
})();

