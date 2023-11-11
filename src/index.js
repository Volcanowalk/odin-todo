import './style.css'
import { createProject } from './project.js'
import { createTask } from './task.js'

const projectList = [];
var projectSelected = null;

const btnOpenProjectForm = document.querySelector('.btnAdd')
const div_project_form = document.querySelector('.project-form')
const btnCancelProject = document.querySelector('.btnCancelProject')
const btnAddProject = document.querySelector('.btnAddProject')
const inputProjectTitle = document.querySelector('.project-title')
const taskForm = document.querySelector('.addTask')
const btnTaskForm = document.querySelector('.btnAddTask')
const btnCloseTaskForm = document.querySelector('.btnSubmitTask')
const btnCloseTask = document.querySelector('.btnCloseTask')
const btnCloseTaskDisplay = document.querySelector('.btnCloseTaskDisplay')
const dialogDisplayTask = document.querySelector('.displayTask')

//Open 'add project' form
btnOpenProjectForm.addEventListener('click', () => {
    div_project_form.style.display = 'grid';
    btnOpenProjectForm.style.display = 'none';
    inputProjectTitle.focus()
})

//Cancel 'add project' form
btnCancelProject.addEventListener('click', () => {
    div_project_form.style.display = 'none';
    btnOpenProjectForm.style.display = 'flex';
    inputProjectTitle.value = ""
})

//Add a new project
btnAddProject.addEventListener('click', () => {
    const project_title = inputProjectTitle.value
    projectList.push(createProject(project_title))
    displayProjects()
    inputProjectTitle.value = ""
    div_project_form.style.display = 'none';
    btnOpenProjectForm.style.display = 'flex';
})

//Display projects
function displayProjects() {

    const div_project_list = document.querySelector('.project-list')

    //Empty project list
    div_project_list.innerHTML = ''

    projectList.forEach((project) => {
        const div_project = document.createElement('div')

        div_project.classList.add('div-project')

        const btnProject = document.createElement('button')
        btnProject.classList.add('btnProject')
        btnProject.textContent = project.name
        btnProject.addEventListener('click', () => {
            projectSelected = project
            clearTaskList()
            displayTasks(project)
            document.querySelector('.content-container').style.visibility = 'visible'
        })
        div_project.appendChild(btnProject)

        const btnDelete = document.createElement('button')
        btnDelete.innerHTML = `<span class="material-symbols-outlined">
        delete
        </span>`
        btnDelete.classList.add('btnDelete')
        btnDelete.addEventListener('click', () => {
            projectList.splice(projectList.indexOf(project), 1)
            displayProjects()
            clearTaskList()
            document.querySelector('.content-container').style.visibility = 'hidden'
        })
        div_project.appendChild(btnDelete)

        div_project_list.appendChild(div_project)
    })
}

//Display tasks
function displayTasks(project) {
    const divTaskList = document.querySelector('.task-list')
    const displayTitle = document.querySelector('.display-title')
    const displayDescription = document.querySelector('.display-description')
    const displayDate = document.querySelector('.display-date')
    const displayPriority = document.querySelector('.display-priority')
    const displayNotes = document.querySelector('.display-notes')

    project.getTasks().forEach((task) => {
        const divTask = document.createElement('div')
        //Task button
        const btnTask = document.createElement('button')
        if(task.state) { //If true, task is completed
            btnTask.innerHTML = `<s>${task.title}</s>`
        } else {
            btnTask.textContent = task.title
        }
        btnTask.classList.add('btnTask')
        btnTask.addEventListener('click', () => {
            displayTitle.textContent = task.title
            displayDescription.textContent = task.description
            displayDate.textContent = task.dueDate
            displayPriority.textContent = task.priority
            displayNotes.textContent = task.notes

            dialogDisplayTask.showModal()
        })
        divTask.appendChild(btnTask)

        //Task clear button
        const btnClearTask = document.createElement('button')
        btnClearTask.classList.add('btnClearTask')
        btnClearTask.innerHTML = `<span class="material-symbols-outlined">
        done</span>`
        btnClearTask.addEventListener('click', () => {
            task.state = true
            btnTask.innerHTML = `<s>${btnTask.innerHTML}</s>`
        })
        divTask.appendChild(btnClearTask)
        divTaskList.appendChild(divTask)
    })
}

//Close 'display task'
btnCloseTaskDisplay.addEventListener('click', () => {
    dialogDisplayTask.close()
})

//Open Task form
btnTaskForm.addEventListener('click', () => {
    taskForm.showModal();
})

//Submit task form
btnCloseTaskForm.addEventListener('click', () => {
    const taskTitle = document.querySelector('#task-title').value
    const taskDescription = document.querySelector('#task-description').value
    const taskDate = document.querySelector('#task-dueDate').value
    const taskPriority = document.querySelector('#task-priority').value
    const taskNotes = document.querySelector('#task-notes').value
    const formTask = document.querySelector('.form-task')

    projectSelected.addTask(createTask(taskTitle, taskDescription, taskDate, taskPriority, taskNotes))

    clearTaskList()
    displayTasks(projectSelected)

    formTask.reset()
    taskForm.close()
})

//Close task form
btnCloseTask.addEventListener('click', () => {
    taskForm.close();
})

//Clear task list
function clearTaskList() {
    const taskList = document.querySelector('.task-list')

    taskList.innerHTML = ''
}