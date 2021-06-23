import { Todo, TodoList } from '../classes/index'

export const crearTodoHTML = ( todo )  => {

    let liElement = document.createElement('li'),
        divElement = document.createElement('div'),
        checkboxInput = document.createElement('input'),
        labelElement = document.createElement('label'),
        removeButton = document.createElement('button'),
        inputElement = document.createElement('input'),
        ulElement = document.querySelector('.todo-list');


    divElement.classList.add('view');

    checkboxInput.classList.add('toggle');
    checkboxInput.setAttribute('type', "checkbox");

    labelElement.textContent = todo.tarea;

    removeButton.classList.add('destroy');

    inputElement.classList.add('edit');
    inputElement.setAttribute('value', "Create a TodoMVC template");

    liElement.appendChild(divElement);
    divElement.appendChild(checkboxInput);
    divElement.appendChild(labelElement);
    divElement.appendChild(removeButton);
    liElement.appendChild(inputElement);

    liElement.setAttribute('data-id', todo.id);
    ulElement.appendChild(liElement);

    removeButton.addEventListener('click', () => {
        localStorage.removeItem(liElement.getAttribute('data-id'));
        ulElement.removeChild(liElement);
        liElement.remove();
    })

    checkboxInput.addEventListener('click', () => {
        liElement.classList.toggle('completed');
        todo.completado = liElement.classList.contains('completed');
        todo.completado ? liElement.setAttribute('checked', '') : liElement.removeAttribute('checked');
    })
}