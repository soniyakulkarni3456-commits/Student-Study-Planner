
// Get HTML elements
const taskInput = document.getElementById("taskInput");
const subjectInput = document.getElementById("subjectInput");
const dateInput = document.getElementById("dateInput");

const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

// Load saved tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Display tasks
function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const taskDiv = document.createElement("div");
        taskDiv.className = "task-item";

        taskDiv.innerHTML = `
            <div>
                <h3>${task.name}</h3>
                <p>Subject: ${task.subject}</p>
                <p>Date: ${task.date || "Not set"}</p>
                <p>Status: ${task.completed ? "Completed" : "Pending"}</p>
            </div>

            <div class="task-buttons">
                <button onclick="toggleTask(${index})">
                    ${task.completed ? "Undo" : "Complete"}
                </button>

                <button onclick="deleteTask(${index})">
                    Delete
                </button>
            </div>
        `;

        taskList.appendChild(taskDiv);
    });

    updateStats();

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add new task
addTaskBtn.addEventListener("click", function() {

    const name = taskInput.value.trim();
    const subject = subjectInput.value.trim();
    const date = dateInput.value;

    if (name === "" || subject === "") {
        alert("Please enter task name and subject!");
        return;
    }

    const newTask = {
        name: name,
        subject: subject,
        date: date,
        completed: false
    };

    tasks.push(newTask);

    taskInput.value = "";
    subjectInput.value = "";
    dateInput.value = "";

    displayTasks();
});

// Complete or undo task
function toggleTask(index) {

    tasks[index].completed = !tasks[index].completed;

    displayTasks();
}

// Delete task
function deleteTask(index) {

    tasks.splice(index, 1);

    displayTasks();
}

// Update dashboard statistics
function updateStats() {

    const total = tasks.length;

    const completed = tasks.filter(
        task => task.completed
    ).length;

    const pending = total - completed;

    totalTasks.textContent = total;
    completedTasks.textContent = completed;
    pendingTasks.textContent = pending;
}

// Initial display
displayTasks();
