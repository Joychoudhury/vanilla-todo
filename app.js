// selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-submit');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// event listeners
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

// functions
function addTodo(event) {
    event.preventDefault();

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    
    const newTodo = document.createElement('li');
    newTodo.innerText = `${todoInput.value}`;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // add todo local storage
    saveLocalTodos(todoInput.value);

    // check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-clipboard-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    //  delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('delete-btn');
    todoDiv.appendChild(deleteButton);

    // append to list

    todoList.appendChild(todoDiv);
    // claer input value
    todoInput.value = '';
}

function deleteCheck(e){
    const item = e.target;
    if(item.classList[0] === 'delete-btn'){
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo)
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e){
    const todo = todoList.childNodes;
    console.log(todo);
    todo.forEach(function(todo){
        if(todo.classList !== undefined){
            switch(e.target.value){
                case 'all':
                    todo.style.display = "flex";
                    break;
                case "completed":
                    if(todo.classList.contains("completed")){
                        todo.style.display = "flex";
                    }
                    else{
                        todo.style.display = "none";
                    }
                    break;
                case "uncompleted":
                    if(!todo.classList.contains("completed")){
                        todo.style.display = "flex";
                    }
                    else{
                        todo.style.display = "none";
                    }
            }
        }
    });
}
function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos") === null)
        todos = [];
    else
        todos=JSON.parse(localStorage.getItem ("todos"));

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}
function getTodos(){
    let todos;
    if(localStorage.getItem("todos") === null)
        todos = [];
    else
        todos=JSON.parse(localStorage.getItem ("todos"));
    todos.forEach((todo)=>{
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        
        const newTodo = document.createElement('li');
        newTodo.innerText = `${todo}`;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);


        // check mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-clipboard-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);

        //  delete button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add('delete-btn');
        todoDiv.appendChild(deleteButton);

        // append to list

        todoList.appendChild(todoDiv);
        // claer input value
        todoInput.value = '';
    })
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos") === null)
        todos = [];
    else
        todos=JSON.parse(localStorage.getItem ("todos"));
    console.log(todo.children[0].remove());
    todos.splice(todos.indexOf(todo.children[0].innerText),1);
    localStorage.setItem("todos",JSON.stringify(todos));
}