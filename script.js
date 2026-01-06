const toggleThemeButton = document.querySelector(".toggleTheme");
const section = document.querySelector("section");
const columns = document.querySelectorAll(".column");
const tasks = document.querySelectorAll(".task");
const delBtns = document.querySelectorAll(".del-btn");
const main = document.querySelector("main");
const delModal = document.querySelector(".del-modal");
const sureDelBtn = document.querySelector(".sure-del");
const sureBackBtn = document.querySelector(".sure-back");
const addTaskBtn = document.querySelector(".addTask");
const todoColumn = document.querySelector("#todo-col");
const newTaskForm = document.querySelector('.add-new-task');
const titleInput = document.querySelector('.task-title');
const descInput = document.querySelector('.task-desc');
const cancelBtn = document.querySelector('.close-modal-btn');
let draggingTask = null;


// Function to set the current task being dragged or clicked
const currentTask = (event) => {
    tasks.forEach((task) => {
    task.addEventListener(`${event}`, () => {
        draggingTask = task;
    });
    });
};
 
currentTask("drag");


// Toggle Dark/Light Theme Functionality
toggleThemeButton.addEventListener("click", () => { 
    section.classList.toggle("dark-theme");
    if(section.classList.contains("dark-theme")) {
        toggleThemeButton.textContent = "☀️";
    } else {
        toggleThemeButton.textContent = "🌙";
    };
})


// Drag and Drop Functionality
columns.forEach(column => {
    column.addEventListener("dragenter", (e) => {
        e.preventDefault();
        column.classList.add("hover-on");
    });

    column.addEventListener("dragleave", (e) => {
        e.preventDefault();
        column.classList.remove("hover-on");
    });

    column.addEventListener("dragover", (e) => {
        e.preventDefault();
    })

    column.addEventListener("drop", (e) => {
        e.preventDefault();
        console.log("dropped: ", draggingTask, column);
        column.appendChild(draggingTask);
        column.classList.remove("hover-on")
    })
});


// Delete Task Functionality
delBtns.forEach((btn) => {

    currentTask("click");

    btn.addEventListener("click", (e) => {
       delModal.classList.remove("hidden")
       delModal.addEventListener("click", () => {
        delModal.classList.add("hidden")
       })
    });

    sureDelBtn.addEventListener("click", () => {
        draggingTask.remove();
        delModal.classList.add("hidden");
    });
    
    sureBackBtn.addEventListener("click", () => {
        delModal.classList.add("hidden");
    });
});


// Add Task Functionality

addTaskBtn.addEventListener("click", () => {
    newTaskForm.classList.remove("hidden")
})

newTaskForm.addEventListener("submit", (inputText) => {
    inputText.preventDefault();
    const titleValue = titleInput.value;
    const descValue = descInput.value;

    const newTaskDiv = document.createElement("div");

    newTaskDiv.innerHTML = `
    <div class="task" draggable="true">
        <h2>${titleValue}</h2>
        <p>${descValue}</p>
        <button class="del-btn">Delete</button>
    </div>
    `
    todoColumn.appendChild(newTaskDiv);

    newTaskForm.classList.add("hidden")

});