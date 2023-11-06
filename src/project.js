
export function createProject(name) {
    const todos = [];

    const addTodo = (todo) => {
        todos.push(todo)
    }

    return { addTodo, name }
}