document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');
  
    
    function loadTasks() {
      fetch('/api/tasks')
        .then(response => response.json())
        .then(data => {
          taskList.innerHTML = '';
          data.forEach((task, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
              ${task}
              <button class="delete-button" data-id="${index}">Excluir</button>
            `;
            taskList.appendChild(listItem);
          });
        });
    }

    loadTasks();

    addTaskButton.addEventListener('click', () => {
      const taskText = taskInput.value.trim();
      if (taskText !== '') {
        fetch('/api/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ task: taskText }),
        })
          .then(response => response.json())
          .then(data => {
            alert(data.message);
            loadTasks();
            taskInput.value = '';
          });
      }
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-button')) {
          const taskId = e.target.getAttribute('data-id');
          fetch(`/api/tasks/${taskId}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
              alert(data.message);
              loadTasks();
            });
        }
      });
    });