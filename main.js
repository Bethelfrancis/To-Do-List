const titleInput = document.getElementById('title-input');
const dateInput = document.getElementById('date-input');
const descriptionInput = document.getElementById('description-input');
const addTaskBtn = document.getElementById('add-new-task');
const taskForm = document.getElementById('task-input');
const closeFormBtn = document.querySelector('.close-task-form');
const displayTask = document.getElementById('task-display');
const updateTaskBtn = document.querySelector('.add-task-input')

const taskData = [];
let currentTask = {}

const addTaskContainer = () => {
    displayTask.innerHTML = ''
    taskData.forEach(({id, title, date, description}) => {
        displayTask.innerHTML += `
            <div class="task" id="${id}">
                <p><strong>Title:</strong> ${title}</p>
                <p><strong>Date:</strong> ${date}</p>
                <p><strong>Description:</strong> ${description}</p>
                <div class="task-buttons">
                    <button onclick="editTask(this)" type="button" class="btn edit">Edit</button>
                    <button onclick="deleteTask(this)" type="button" class="btn delete">Delete</button>
                </div>
            </div>
        `;
    })
}

addTaskBtn.addEventListener('click', () => {
    addTaskBtn.style.display = 'none';
    taskForm.style.display = 'block';
    displayTask.style.display = 'none';
})

closeFormBtn.addEventListener('click', e => {
    e.preventDefault();
    const isClear = confirm('Discard unsave changes');

    if (isClear) {
        taskForm.style.display = 'none';
        addTaskBtn.style.display = 'inline-block';
        titleInput.value = ''
        dateInput.value = ''
        descriptionInput.value = ''
        currentTask = {}
    }

    displayTask.style.display = 'flex'
})

const deleteTask = (btn) => {
    const taskElement = btn.closest('.task');
    const dataId = taskData.findIndex(items => items.id === taskElement.id);

    taskElement.remove();
    taskData.splice(dataId, 1)
}

const editTask = (btn) => {
    const taskElement = btn.closest('.task');
    const dataId = taskData.findIndex(items => items.id === Number(taskElement.id));

    if (dataId !== -1) {
        const currentTaskId = taskData[dataId]

        titleInput.value = currentTaskId.title;
        dateInput.value = currentTaskId.date;
        descriptionInput.value = currentTaskId.description;

        currentTask = {...currentTaskId}

        taskForm.style.display = 'block';
        addTaskBtn.style.display = 'none'
        updateTaskBtn.textContent = 'Update Task'
    }
}

taskForm.addEventListener('submit', e => {
    e.preventDefault();

    const existingTaskIndex = taskData.findIndex(item => item.id === currentTask.id);
    if (existingTaskIndex !== -1) {
        taskData.splice(existingTaskIndex, 1)
    }

    const newTask = {
        id: Date.now(),
        title: titleInput.value,
        date: dateInput.value || 'No Date set',
        description: descriptionInput.value
    }

    taskData.push(newTask);
    addTaskContainer();

    currentTask = {}
    taskForm.style.display = 'none';
    addTaskBtn.style.display = 'inline-block';
    titleInput.value = ''
    dateInput.value = ''
    descriptionInput.value = ''
    displayTask.style.display = 'flex'

    console.log(`Current task count: ${taskData.length}`)
})