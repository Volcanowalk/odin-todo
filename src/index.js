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

    project.getTasks().forEach((task) => {
        const btnTask = document.createElement('button')
        btnTask.textContent = task.title
        btnTask.classList.add('btnTask')
        divTaskList.appendChild(btnTask)
    })
}

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