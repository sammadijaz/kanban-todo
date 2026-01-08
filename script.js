const toggleThemeButton = document.querySelector(".toggleTheme");
const section = document.querySelector("section");
const columns = document.querySelectorAll(".column");
const main = document.querySelector("main");
const delModal = document.querySelector(".del-modal");
const sureDelBtn = document.querySelector(".sure-del");
const sureBackBtn = document.querySelector(".sure-back");
const addTaskBtn = document.querySelector(".addTask");
const todoColumn = document.querySelector("#todo-col");
const newTaskModal = document.querySelector('.add-new-task');
const newTaskForm = document.querySelector('.add-new-task form');
const titleInput = document.querySelector('.task-title');
const descInput = document.querySelector('.task-desc');
const cancelBtn = document.querySelector('.close-modal-btn');

let draggingTask = null;
let taskToDelete = null;

function addTaskHandlers(task) {
  task.setAttribute('draggable', 'true');

  task.addEventListener('dragstart', (e) => {
    draggingTask = task;
    try {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', ''); // required for some browsers
    } catch (err) {}
  });

  // Clicking selects the task (keeps behavior consistent)
  task.addEventListener('click', () => {
    draggingTask = task;
  });

  const delBtn = task.querySelector('.del-btn');
  if (delBtn) {
    delBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      taskToDelete = task;
      delModal.classList.remove('hidden');
    });
  }
}

// Initialize handlers for existing tasks
document.querySelectorAll('.task').forEach(addTaskHandlers);

// Toggle Theme
toggleThemeButton.addEventListener("click", () => {
  section.classList.toggle("dark-theme");
  toggleThemeButton.textContent = section.classList.contains("dark-theme") ? "☀️" : "🌙";
});

// Column drag/drop
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
  });

  column.addEventListener("drop", (e) => {
    e.preventDefault();
    if (draggingTask && draggingTask.parentElement) {
      column.appendChild(draggingTask);
    }
    column.classList.remove("hover-on");
    draggingTask = null;
  });
});

// Delete modal overlay click (close when clicking outside inner container)
delModal.addEventListener('click', (e) => {
  if (e.target === delModal) delModal.classList.add('hidden');
});

sureDelBtn.addEventListener("click", () => {
  if (taskToDelete) {
    taskToDelete.remove();
    taskToDelete = null;
  }
  delModal.classList.add("hidden");
});

sureBackBtn.addEventListener("click", () => {
  taskToDelete = null;
  delModal.classList.add("hidden");
});

// Add Task UI
addTaskBtn.addEventListener("click", () => {
  newTaskModal.classList.remove("hidden");
});

cancelBtn.addEventListener("click", () => {
  newTaskModal.classList.add("hidden");
});

// Handle form submit to create a new task node and attach handlers
newTaskForm.addEventListener("submit", (ev) => {
  ev.preventDefault();
  const titleValue = titleInput.value.trim();
  const descValue = descInput.value.trim();
  if (!titleValue) return;

  const task = document.createElement('div');
  task.className = 'task';
  task.innerHTML = `
    <h2>${titleValue}</h2>
    <p>${descValue}</p>
    <button class="del-btn">Delete</button>
  `;

  todoColumn.appendChild(task);
  addTaskHandlers(task);

  // reset form and close modal
  newTaskForm.reset();
  newTaskModal.classList.add('hidden');
});

// Defensive: clear dragging references on window mouseup (prevents stale refs)
window.addEventListener('mouseup', () => {
  draggingTask = null;
});