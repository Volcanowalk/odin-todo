import './style.css'
import { createProject } from './project.js'
import { createTask } from './task.js'

const projectList = [];

const btnOpenProjectForm = document.querySelector('.btnAdd')
const div_project_form = document.querySelector('.project-form')
const btnCancelProject = document.querySelector('.btnCancelProject')
const btnAddProject = document.querySelector('.btnAddProject')
const inputProjectTitle = document.querySelector('.project-title')

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


btnAddProject.addEventListener('click', () => {
    const project_title = inputProjectTitle.value
    projectList.push(createProject(project_title))
    displayProjects()
    inputProjectTitle.value = ""
    div_project_form.style.display = 'none';
    btnOpenProjectForm.style.display = 'flex';
})

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
        div_project.appendChild(btnProject)

        const btnDelete = document.createElement('button')
        btnDelete.innerHTML = `<span class="material-symbols-outlined">
        delete
        </span>`
        btnDelete.classList.add('btnDelete')
        btnDelete.addEventListener('click', () => {
            projectList.splice(projectList.indexOf(project), 1)
            displayProjects()
        })
        div_project.appendChild(btnDelete)

        div_project_list.appendChild(div_project)
    })
}

