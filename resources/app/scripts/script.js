const employeesData = loadData();

try {
    let employeesHTML = '';

    employeesData.forEach((person) => {
        employeesHTML += `
    <div class="employee-container" data-id="${person.id}">
        <div class="employee-image-container" data-id="${person.id}"><img class="employee-image" src="../pictures/${person.photo}"></div>
        <div class="employee-info">
            <div class="employee-name"><span class="word">${person.firstName} ${person.lastName}</span></div>
            <div class="employee-details">
                <div><span class="info">Email:</span> <span class="word">${person.email}</span></div>
                <div><span class="info">Phone:</span> <span class="word">${person.phone}</span></div>
                <div><span class="info">Position:</span> <span class="word">${person.position}</span></div>
                <div><span class="info">Address:</span> <span class="word">${person.address}</span></div>
            </div>
        </div>
        <div class="employee-tasks">

            <div class="employee-tasks-header">
                <div class="employee-todo">Tasks:</div>
                <div class="employee-button"><button class="add-button" data-id="${person.id}">Add</button></div>
            </div>

            <div class="employee-specific-tasks">
                <ol>
                    ${person.tasks.map((task) => `<li><span class="word">${task}</span> <button class="delete-button" data-task-index="${task}">Delete</button></li>`).join('')}
                </ol>
            </div>
        </div>
    </div>`;
    });

    document.querySelector('.employees').innerHTML = employeesHTML;

    document.querySelector('.input-search').addEventListener('input', ({ target }) => {
        const typing = target.value.toLowerCase();

        const employeeContainers = document.querySelectorAll('.employee-container');

        employeeContainers.forEach((employeeContainer) => {
            const wordsToSearch = employeeContainer.querySelectorAll('.word');

            let foundMatch = false;

            wordsToSearch.forEach((word) => {
                const wordText = word.textContent.toLowerCase();

                if (wordText.includes(typing)) {
                    foundMatch = true;
                }
            });

            if (foundMatch) {
                employeeContainer.style.display = '';
            } else {
                employeeContainer.style.display = 'none';
            }
        });
    });

    document.querySelector('.log-out-button').addEventListener('click', () => {
        document.querySelector('body').style.overflow = `hidden`;

        document.querySelector('.overlay').style = `
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    `;

        document.querySelector('.overlay').innerHTML = `
        <div class="logout-confirmation">
            <p>Do you really want to log out?</p>
            <div class="log-out-buttons">
                <button class="log-out-yes">Yes</button>
                <button class="log-out-no">No</button>
            </div>
        </div>
    `;

        document.querySelector('.logout-confirmation').style = `
        background-color: rgb(63, 63, 63);
        width: 500px;
        padding: 15px;
        border-radius: 5px;
    `;

        document.querySelector('.logout-confirmation p').style = `
        text-align: center;
        font-weight: bold;
        font-size: 30px;
        margin-top: 15px;
        margin-bottom: 25px;
    `;

        document.querySelector('.log-out-buttons').style = `
        text-align: center;
    `;

        document.querySelectorAll('.log-out-yes, .log-out-no').forEach((button) => {
            button.style = `
        font-size: 24px;
        background-color: black;
        color: white;
        border: none;
        border-radius: 5px;
        padding: 8px 10px;
        cursor: pointer;
    `;
        });

        document.querySelector('.log-out-yes').addEventListener('click', () => {
            window.location.href = 'login.html';
        });

        document.querySelector('.log-out-no').addEventListener('click', () => {
            document.querySelector('body').style.overflow = ``;
            document.querySelector('.overlay').style = ``;
            document.querySelector('.overlay').innerHTML = ``;
        });
    });

    const inputTask = '<div class="absolute-task"><input class="input-task" type="text"></div>';

    document.querySelector('.employees').addEventListener('click', (event) => {
        const target = event.target;

        if (target.classList.contains('add-button')) {
            const employeeId = target.dataset.id;
            const employeeContainer = document.querySelector(`.employee-container[data-id="${employeeId}"]`);
            const employeeButton = employeeContainer.querySelector('.employee-button');

            employeeButton.innerHTML += inputTask;

            const lastInputTask = employeeButton.querySelector('.input-task:last-child');
            if (lastInputTask) {
                lastInputTask.focus();
            }
        }
    });

    document.querySelectorAll('.employee-container').forEach((container) => {
        container.addEventListener('keydown', (event) => {
            const target = event.target;

            if (target.classList.contains('input-task') && event.key === 'Enter') {
                const tasks = target.value;

                if (tasks.trim() !== '') {

                    const employeeId = container.dataset.id;
                    const employee = employeesData.find((emp) => emp.id === parseInt(employeeId, 10));

                    if (employee) {
                        employee.tasks.push(tasks);

                        const tasksContainer = container.querySelector('.employee-specific-tasks ol');
                        tasksContainer.innerHTML = employee.tasks.map((task) => `<li><span class="word">${task}</span> <button class="delete-button" data-task-index="${task}">Delete</button></li>`).join('');
                        saveData()
                    }

                    target.parentNode.removeChild(target);

                    const lastInputTask = container.querySelector('.input-task:last-child');
                    if (lastInputTask) {
                        lastInputTask.focus();
                    }
                }
                else {
                    target.parentNode.removeChild(target);
                }
            }
        });
    });

    document.querySelector('.employees').addEventListener('click', (event) => {
        const target = event.target;

        if (target.classList.contains('delete-button')) {
            const taskIndex = target.dataset.taskIndex;
            const employeeContainer = target.closest('.employee-container');
            const employeeId = employeeContainer.dataset.id;
            const employee = employeesData.find((emp) => emp.id === parseInt(employeeId, 10));

            if (employee) {
                employee.tasks = employee.tasks.filter((task) => task !== taskIndex);

                const tasksContainer = employeeContainer.querySelector('.employee-specific-tasks ol');
                tasksContainer.innerHTML = employee.tasks.map((task) => `<li><span class="word">${task}</span> <button class="delete-button" data-task-index="${task}">Delete</button></li>`).join('');
                saveData()
            }
        }
    });

} catch (error) {
    console.error('Error: ' + error.message);
}