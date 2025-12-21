// Initialize data from localStorage
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let timetable = JSON.parse(localStorage.getItem('timetable')) || [];
let reminders = JSON.parse(localStorage.getItem('reminders')) || [];

// Display current date
function updateDate() {
    const dateElement = document.getElementById('currentDate');
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = now.toLocaleDateString('en-US', options);
}

// Request notification permission
function requestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
}

// Show notification
function showNotification(title, body) {
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, {
            body: body,
            icon: '📅',
            badge: '🔔'
        });
    }
}

// To-Do List Functions
function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    
    if (text) {
        todos.push({ id: Date.now(), text: text, completed: false });
        input.value = '';
        saveTodos();
        renderTodos();
    }
}

function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
        renderTodos();
    }
}

function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    saveTodos();
    renderTodos();
}

function renderTodos() {
    const list = document.getElementById('todoList');
    list.innerHTML = '';
    
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <input type="checkbox" ${todo.completed ? 'checked' : ''} 
                   onchange="toggleTodo(${todo.id})">
            <span>${todo.text}</span>
            <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
        `;
        list.appendChild(li);
    });
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Timetable Functions
function addTimeSlot() {
    const timeInput = document.getElementById('timeInput');
    const activityInput = document.getElementById('activityInput');
    
    const time = timeInput.value;
    const activity = activityInput.value.trim();
    
    if (time && activity) {
        timetable.push({ id: Date.now(), time: time, activity: activity });
        timetable.sort((a, b) => a.time.localeCompare(b.time));
        timeInput.value = '';
        activityInput.value = '';
        saveTimetable();
        renderTimetable();
    }
}

function deleteTimeSlot(id) {
    timetable = timetable.filter(t => t.id !== id);
    saveTimetable();
    renderTimetable();
}

function renderTimetable() {
    const container = document.getElementById('timetable');
    container.innerHTML = '';
    
    timetable.forEach(slot => {
        const div = document.createElement('div');
        div.className = 'time-slot';
        div.innerHTML = `
            <span class="time">${slot.time}</span>
            <span class="activity">${slot.activity}</span>
            <button class="delete-btn" onclick="deleteTimeSlot(${slot.id})">Delete</button>
        `;
        container.appendChild(div);
    });
}

function saveTimetable() {
    localStorage.setItem('timetable', JSON.stringify(timetable));
}

// Reminder Functions
function addReminder() {
    const datetimeInput = document.getElementById('reminderDatetime');
    const textInput = document.getElementById('reminderText');
    
    const datetime = datetimeInput.value;
    const text = textInput.value.trim();
    
    if (datetime && text) {
        reminders.push({ 
            id: Date.now(), 
            datetime: datetime, 
            text: text,
            notified: false
        });
        reminders.sort((a, b) => a.datetime.localeCompare(b.datetime));
        datetimeInput.value = '';
        textInput.value = '';
        saveReminders();
        renderReminders();
    }
}

function deleteReminder(id) {
    reminders = reminders.filter(r => r.id !== id);
    saveReminders();
    renderReminders();
}

function renderReminders() {
    const container = document.getElementById('reminderList');
    container.innerHTML = '';
    
    const now = new Date();
    
    reminders.forEach(reminder => {
        const reminderDate = new Date(reminder.datetime);
        const isActive = reminderDate <= now && !reminder.notified;
        
        const div = document.createElement('div');
        div.className = `reminder-item ${isActive ? 'active' : ''}`;
        
        const formattedDate = reminderDate.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        div.innerHTML = `
            <span class="time">${formattedDate}</span>
            <span class="text">${reminder.text}</span>
            ${isActive ? '<span class="notification-badge">Due!</span>' : ''}
            <button class="delete-btn" onclick="deleteReminder(${reminder.id})">Delete</button>
        `;
        container.appendChild(div);
    });
}

function saveReminders() {
    localStorage.setItem('reminders', JSON.stringify(reminders));
}

function checkReminders() {
    const now = new Date();
    
    reminders.forEach(reminder => {
        const reminderDate = new Date(reminder.datetime);
        
        if (reminderDate <= now && !reminder.notified) {
            showNotification('Reminder!', reminder.text);
            reminder.notified = true;
            saveReminders();
            renderReminders();
        }
    });
}

// Event listeners for Enter key
document.addEventListener('DOMContentLoaded', () => {
    updateDate();
    requestNotificationPermission();
    renderTodos();
    renderTimetable();
    renderReminders();
    
    // Check reminders every 30 seconds
    setInterval(checkReminders, 30000);
    checkReminders();
    
    document.getElementById('todoInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTodo();
    });
    
    document.getElementById('activityInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTimeSlot();
    });
    
    document.getElementById('reminderText').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addReminder();
    });
});
