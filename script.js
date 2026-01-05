const toggleThemeButton = document.querySelector(".toggleTheme");
const section = document.querySelector("section");
const columns = document.querySelectorAll(".column");
const tasks = document.querySelectorAll(".task");
const delBtns = document.querySelectorAll(".del-btn");
const main = document.querySelector("main");
const delModal = document.querySelector(".del-modal");
let draggingTask = null;


tasks.forEach((task) => {
    task.addEventListener("drag", () => {
        draggingTask = task;
    });
});

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
    btn.addEventListener("click", (e) => {
       delModal.classList.remove("hidden")
       delModal.addEventListener("click", () => {
        delModal.classList.add("hidden")
       })
    });
});