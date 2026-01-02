const input = document.getElementById("todo-input");
const addbtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");


// try to load saved array from localstorage if any present
const saved = localStorage.getItem('todos');
const todos = saved ? JSON.parse(saved) : [];


//save  current todos to localstorage 

function savetodos() {
    localStorage.setItem('todos', JSON.stringify(todos))

}

function createToDoNode(todo, index) {
    const li = document.createElement('li');

    // checkbox to toggle completion
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!todo.completed;
    checkbox.addEventListener("change", function () {
        todo.completed = checkbox.checked;

        textSpan.style.textDecoration = todo.completed? "line-through": "";
        savetodos();
    })

    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    textSpan.style.margin = "0 8px"
    if (todo.completed) {
        textSpan.style.textDecoration = "line-through";
    }

    textSpan.addEventListener("dblclick", function () {
        const newText = prompt("Edit todo", todo.text)
        if (newText !== null) {
            todo.text = newText.trim();
            textSpan.textContent = todo.text;
            savetodos();
        }
    })

    // deletye btn
    const dltBtn = document.createElement("button");
    dltBtn.textContent = "Delete";
    dltBtn.addEventListener("click", function () {
        todos.splice(index, 1);
        render();
        savetodos();
    })

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(dltBtn);

    return li;
}

function render() {
    list.innerHTML = "";

    // recreate each itm
    todos.forEach((todo, index) => {
        const node = createToDoNode(todo, index);
        list.appendChild(node);
    });
}


function addToDos() {
    const text = input.value.trim();
    if (!text) {
        return;
    }

    // push new todo
    todos.push({ text, completed: false })
    input.value = "";
    render();
    savetodos();
}

addbtn.addEventListener("click", addToDos);
input.addEventListener("keydown", function(e){
    if (e.key == "Enter") {
        addToDos();
    }
})
render();
