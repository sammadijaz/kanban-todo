const toggleThemeButton = document.querySelector(".toggleTheme");
const section = document.querySelector("section");
const columns = document.querySelectorAll(".column");
const tasks = document.querySelectorAll(".task");
const delBtns = document.querySelectorAll(".del-btn");
const main = document.querySelector("main");
const delModal = document.querySelector(".del-modal");
const sureDelBtn = document.querySelector(".sure-del");
const sureBackBtn = document.querySelector(".sure-back");
let draggingTask = null;


const currentTask = (event) => {
    tasks.forEach((task) => {
    task.addEventListener(`${event}`, () => {
        draggingTask = task;
    });
    });
};
 
currentTask("drag");

toggleThemeButton.addEventListener("click", () => { 
    section.classList.toggle("dark-theme");
    if(section.classList.contains("dark-theme")) {
        toggleThemeButton.textContent = "☀️";
    } else {
        toggleThemeButton.textContent = "🌙";
    };
})

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



delBtns.forEach((btn) => {

    tasks.forEach((task) => {
         task.addEventListener("click", () => {
        draggingTask = task;
        });
    });

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