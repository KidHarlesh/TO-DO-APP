
const taskInput = document.getElementById("task-Input");
const taskList = document.getElementById("task-List");
const progressBar = document.getElementById("progress");
let totalTasks = 0; // Track the total number of tasks
let checkedTasks = 0; // Track the number of checked tasks

// Function to update task count
function updateTaskCount() {
  const numbersElement = document.getElementById("numbers");
  numbersElement.textContent = `${checkedTasks}/${totalTasks}`;
}

// Add a new task
function addTask() {
  if (taskInput.value === "") {
    alert("Please input a task");
  } else {
    let li = document.createElement("li");
    li.innerHTML = taskInput.value;
    taskList.appendChild(li);
    // Create and append delete button
    let span = document.createElement("span");
    span.style.backgroundImage = "url('/images/cancel-button.png')";
    span.style.backgroundSize = "cover";
    span.style.backgroundPosition = "center";
    span.style.width = "28px";
    span.style.height = "28px";
    li.style.display = "flex";
    li.style.alignItems = "center";
    li.style.justifyContent = "space-between";
    li.appendChild(span);
    totalTasks++;
    updateProgress();
    updateTaskCount();
    saveData(); // Save tasks after adding
  }
  taskInput.value = "";
}

// Update progress bar based on task completion
function updateProgress() {
  if (totalTasks === 0) {
    progressBar.style.width = "0%";
  } else {
    const progress = (checkedTasks / totalTasks) * 100;
    progressBar.style.width = `${progress}%`;
  }
}

// Save the innerHTML of the task list to localStorage
function saveData() {
  localStorage.setItem("taskListHTML", taskList.innerHTML);
  localStorage.setItem("totalTasks", totalTasks);
  localStorage.setItem("checkedTasks", checkedTasks);
}

// Load the task list HTML from localStorage
function loadData() {
  const savedHTML = localStorage.getItem("taskListHTML");
  const savedTotalTasks = localStorage.getItem("totalTasks");
  const savedCheckedTasks = localStorage.getItem("checkedTasks");

  if (savedHTML) {
    taskList.innerHTML = savedHTML;

    // Recalculate the totalTasks and checkedTasks
    totalTasks = parseInt(savedTotalTasks, 10) || 0;
    checkedTasks = parseInt(savedCheckedTasks, 10) || 0;

    // Ensure tasks are properly marked as checked
    Array.from(taskList.children).forEach((li) => {
      if (li.classList.contains("checked")) {
        li.classList.add("checked");
      }
    });

    updateTaskCount();
    updateProgress();
  }
}

// Handle task interactions: check/uncheck or delete task
taskList.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    const li = e.target;
    li.classList.toggle("checked");

    // Update checkedTasks count
    checkedTasks = Array.from(taskList.children).filter((task) =>
      task.classList.contains("checked")
    ).length;

    updateTaskCount();
    updateProgress();
    saveData();
  } else if (e.target.tagName === "SPAN") {
    const task = e.target.parentElement;
    task.remove();
    totalTasks--;
    if (task.classList.contains("checked")) {
      checkedTasks--;
    }
    updateTaskCount();
    updateProgress();
    saveData();
  }
});

// Show tasks from localStorage on page load
loadData();

document.getElementById("newtask").addEventListener("click", function (e) {
  e.preventDefault();
});

