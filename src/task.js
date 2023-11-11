export function createTask(title, description, dueDate, priority, notes) {

    let state = false

    return { title, description, dueDate, priority, notes, state }
}
