// script.js

let tasks = []; // Array to store tasks

// Function to add a new task
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskDueDate = document.getElementById("taskDueDate");
  const taskPriority = document.getElementById("taskPriority");

  const task = {
    id: Date.now(),
    text: taskInput.value,
    dueDate: taskDueDate.value,
    priority: taskPriority.value,
    completed: false,
  };

  if (task.text.trim() !== "") {
    tasks.push(task);
    renderTasks();
  }

  // Clear the input fields
  taskInput.value = "";
  taskDueDate.value = "";
  taskPriority.value = "Low";
}

// Function to render tasks on the page
function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const taskElement = document.createElement("li");
    taskElement.className = task.completed ? "completed" : "";

    taskElement.innerHTML = `
      <span>${task.text}</span>
      <span>Due: ${task.dueDate} | Priority: ${task.priority}</span>
      <div>
        <button class="complete" onclick="toggleComplete(${task.id})">${task.completed ? "Undo" : "Complete"}</button>
        <button class="edit" onclick="editTask(${task.id})">Edit</button>
        <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;

    taskList.appendChild(taskElement);
  });
}

// Function to mark a task as complete or undo it
function toggleComplete(taskId) {
  const task = tasks.find(t => t.id === taskId);
  task.completed = !task.completed;
  renderTasks();
}

// Function to delete a task
function deleteTask(taskId) {
  tasks = tasks.filter(t => t.id !== taskId);
  renderTasks();
}

// Function to edit a task
function editTask(taskId) {
  const task = tasks.find(t => t.id === taskId);
  const newText = prompt("Edit task:", task.text);
  if (newText !== null && newText.trim() !== "") {
    task.text = newText;
    renderTasks();
  }
}

// Function to sort tasks by priority or due date
function sortTasks(criterion) {
  if (criterion === 'priority') {
    tasks.sort((a, b) => {
      const priorityOrder = { "Low": 1, "Medium": 2, "High": 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  } else if (criterion === 'dueDate') {
    tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  }
  renderTasks();
}

// Initial render of tasks
renderTasks();
