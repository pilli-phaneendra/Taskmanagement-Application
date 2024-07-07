document.addEventListener('DOMContentLoaded', function() {
    let nextId = 1; // Initialize ID counter
    const demoTasks = [
        {
            id: nextId++, // Assign unique ID
            title: 'Task 1',
            description: 'This is the description for Task 1',
            dueDate: '2024-07-10'
        },
        {
            id: nextId++, // Assign unique ID
            title: 'Task 2',
            description: 'This is the description for Task 2',
            dueDate: '2024-07-15'
        },
        {
            id: nextId++, // Assign unique ID
            title: 'Task 3',
            description: 'This is the description for Task 3',
            dueDate: '2024-07-20'
        }
    ];

    // Function to render tasks
    function renderTasks(tasks) {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';

        tasks.forEach((task) => {
            const taskCard = document.createElement('div');
            taskCard.className = 'card mb-3';
            taskCard.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">ID: ${task.id} - ${task.title}</h5>
                    <p class="card-text">${task.description}</p>
                    <p class="card-text"><small class="text-muted">Due: ${task.dueDate}</small></p>
                    <div class="d-flex justify-content-end">
                        <button class="btn btn-info btn-sm me-2" onclick="viewTask(${task.id})">View</button>
                        <button class="btn btn-warning btn-sm me-2" onclick="editTask(${task.id})">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteTask(${task.id})">Delete</button>
                    </div>
                </div>
            `;
            taskList.appendChild(taskCard);
        });
    }

    // Function to view task
    window.viewTask = function(id) {
        const task = demoTasks.find(task => task.id === id);
        document.getElementById('viewTaskTitle').textContent = task.title;
        document.getElementById('viewTaskDescription').textContent = task.description;
        document.getElementById('viewTaskDueDate').textContent = `Due: ${task.dueDate}`;
        var viewTaskModal = new bootstrap.Modal(document.getElementById('viewTaskModal'));
        viewTaskModal.show();
    };

    // Function to edit task
    window.editTask = function(id) {
        const task = demoTasks.find(task => task.id === id);
        document.getElementById('editTaskTitle').value = task.title;
        document.getElementById('editTaskDescription').value = task.description;
        document.getElementById('editTaskDueDate').value = task.dueDate;
        document.getElementById('editTaskIndex').value = id;
        var editTaskModal = new bootstrap.Modal(document.getElementById('editTaskModal'));
        editTaskModal.show();
    };

    // Function to delete task
    window.deleteTask = function(id) {
        const index = demoTasks.findIndex(task => task.id === id);
        if (index > -1) {
            demoTasks.splice(index, 1);
            renderTasks(demoTasks);
        }
    };

    // Handle form submission for editing
    document.getElementById('editTaskForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const id = parseInt(document.getElementById('editTaskIndex').value);
        const task = demoTasks.find(task => task.id === id);
        task.title = document.getElementById('editTaskTitle').value;
        task.description = document.getElementById('editTaskDescription').value;
        task.dueDate = document.getElementById('editTaskDueDate').value;
        renderTasks(demoTasks);

        // Hide the modal
        var editTaskModal = new bootstrap.Modal(document.getElementById('editTaskModal'));
        editTaskModal.hide();
    });

    // Handle form submission for adding a new task
    document.getElementById('taskForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const newTask = {
            id: nextId++, // Increment and assign unique ID
            title: document.getElementById('taskTitle').value,
            description: document.getElementById('taskDescription').value,
            dueDate: document.getElementById('taskDueDate').value
        };
        demoTasks.push(newTask);
        renderTasks(demoTasks);
        this.reset();
    });

    // Handle search functionality
    document.getElementById('searchInput').addEventListener('input', function(event) {
        const query = event.target.value.toLowerCase();
        const filteredTasks = demoTasks.filter(task => 
            task.title.toLowerCase().includes(query) || 
            task.id.toString().includes(query)
        );
        renderTasks(filteredTasks);
    });

    // Initial render of demo tasks
    renderTasks(demoTasks);
});
