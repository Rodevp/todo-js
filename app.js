const allTask = []
const tasksCompledted = []
const taskToComplete = []
const addInput = document.getElementById('add-input')
const addBtn = document.getElementById('add_btn')
let LENGTH_TO_COMPLETE = 0

const saveLocalStorage = (key, value) => {
    localStorage.setItem(key, value)
}

const addTask = (task) => {
    allTask.push(task)
}

const printTask = (task) => {

    const taskContent = document.getElementById('task')
    const fragment = document.createDocumentFragment();

    task.forEach(taskElement => {

        const div = document.createElement('div');
        const divChek = document.createElement('div');
        const h2 = document.createElement('h2');
        const button = document.createElement('button');

        div.classList.add('task')
        divChek.classList.add('check__task')
        h2.classList.add('title__task')
        button.classList.add('task__delete_btn')

        h2.textContent = taskElement.title
        button.textContent = 'X'

        div.appendChild(divChek)
        div.appendChild(h2)
        div.appendChild(button)

        fragment.appendChild(div)

    })

    taskContent.appendChild(fragment)

}

addInput.addEventListener('keyup', e => {

    const KEY_CODE = e.key
    const titleTask = e.target.value

    if (KEY_CODE === 'Enter' && titleTask !== '') {

        const task = {
            title: titleTask,
            isCompleted: false
        }

        addTask(task)

        saveLocalStorage('all', JSON.stringify(allTask))
        printTask(JSON.parse(localStorage.getItem('all')))

        e.target.value = ''

    }


})

addBtn.addEventListener('click', e => {

    const input = document.getElementById('add-input')
    const titleTask = input.value;

    const task = {
        title: titleTask,
        isCompleted: false
    }

    addTask(task)

    saveLocalStorage('all', JSON.stringify(allTask))
    printTask(JSON.parse(localStorage.getItem('all')))

    input.value = ''

})


printTask(JSON.parse(localStorage.getItem('all')))
