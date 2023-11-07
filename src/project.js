
export function createProject(name) {
    const tasks = [];

    const addTask = (task) => {
        tasks.push(task)
    }

    const getTasks = () => tasks;

    return { addTask, getTasks, name }
}