const addTaskBtn = document.getElementById('addTask');
const btnText = addTaskBtn.innerText;
const tasknameTextField = document.getElementById('taskname');
const recordDisplay = document.getElementById('records');
let taskArray = [];
let edit_id = null;
let objStr = localStorage.getItem('tasks');

if (objStr != null) {
    taskArray = JSON.parse(objStr);
}

displayInfo();

addTaskBtn.onclick = () => {
    const name = tasknameTextField.value;
    if (edit_id != null) {
        taskArray.splice(edit_id, 1, { 'name': name, 'completed': taskArray[edit_id].completed });
        edit_id = null;
    } else {
        taskArray.push({ 'name': name, 'completed': false });
    }
    saveInfo(taskArray);
    tasknameTextField.value = '';
    addTaskBtn.innerText = btnText;
};

function saveInfo(taskArray) {
    let str = JSON.stringify(taskArray);
    localStorage.setItem('tasks', str);
    displayInfo();
}

function displayInfo() {
    let statement = '';
    taskArray.forEach((task, i) => {
        statement += `<tr>
            <th scope="row">
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleComplete(${i})">
                ${i + 1}
            </th>
            <td class="${task.completed ? 'completed' : ''}">${task.name}</td>
            <td>
                <button class="btn btn-info text-white mx-2" onclick="editInfo(${i})"><i class="fas fa-pen-to-square"></i></button>
                <button class="btn btn-danger text-white" onclick="deleteInfo(${i})"><i class="fas fa-trash"></i></button>
            </td>
        </tr>`;
    });
    recordDisplay.innerHTML = statement;
}

function editInfo(id) {
    edit_id = id;
    tasknameTextField.value = taskArray[id].name;
    addTaskBtn.innerText = 'Save Changes';
}

function deleteInfo(id) {
    taskArray.splice(id, 1);
    saveInfo(taskArray);
}

function toggleComplete(id) {
    taskArray[id].completed = !taskArray[id].completed;
    saveInfo(taskArray);
}

const searchInputField = document.querySelector('#search');
searchInputField.addEventListener('input', function (e) {
    const searchStr = e.target.value.toLowerCase();
    let statement = '';
    taskArray.forEach((task, i) => {
        if (task.name.toLowerCase().includes(searchStr)) {
            statement += `<tr>
                <th scope="row">
                    <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleComplete(${i})">
                    ${i + 1}
                </th>
                <td class="${task.completed ? 'completed' : ''}">${task.name}</td>
                <td>
                    <button class="btn btn-info text-white mx-2" onclick="editInfo(${i})"><i class="fas fa-pen-to-square"></i></button>
                    <button class="btn btn-danger text-white" onclick="deleteInfo(${i})"><i class="fas fa-trash"></i></button>
                </td>
            </tr>`;
        }
    });
    if (statement === '') {
        statement = '<tr><td colspan="3" class="text-center">No records found</td></tr>';
    }
    recordDisplay.innerHTML = statement;
});
