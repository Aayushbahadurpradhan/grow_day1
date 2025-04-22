const taskTitleInput = document.getElementById('taskTitleInput');
const taskDescInput = document.getElementById('taskDescInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const themeToggle = document.getElementById('themeToggle');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const card = document.createElement('div');
    card.className = 'task-card';

    const title = document.createElement('h3');
    title.textContent = task.title;
    title.className = 'task-title';

    const description = document.createElement('p');
    description.textContent = task.description;
    description.className = `task-description ${task.completed ? 'line-through text-gray-400' : ''}`;

    const footer = document.createElement('div');
    footer.className = 'task-footer';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.className = 'task-checkbox';
    checkbox.onchange = () => toggleComplete(index);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑️';
    deleteBtn.className = 'task-delete-btn';
    deleteBtn.onclick = () => {
      if (confirm('Do you want to delete this task?')) {
        removeTask(index);
      }
    };

    footer.appendChild(checkbox);
    footer.appendChild(deleteBtn);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(footer);
    taskList.appendChild(card);
  });
}

function addTask() {
  const title = taskTitleInput.value.trim();
  const description = taskDescInput.value.trim();

  if (title === '' || description === '') {
    alert('Please enter both task title and description!');
    return;
  }

  tasks.push({ title, description, completed: false });
  saveTasks();
  renderTasks();

  taskTitleInput.value = '';
  taskDescInput.value = '';
}

function removeTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

addTaskBtn.addEventListener('click', addTask);

[taskTitleInput, taskDescInput].forEach(input => {
  input.addEventListener('keypress', e => {
    if (e.key === 'Enter') addTask();
  });
});

themeToggle.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
});

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.documentElement.classList.add('dark');
}

renderTasks();
