const addInput = document.getElementById('add-input')
const addBtn = document.getElementById('add_btn')
const completedTask = document.getElementById('completed')
const allTask = document.getElementById('all_btn')
const taskActives = document.getElementById('actives')
const checkTask = document.getElementById('check')
const clearCompleted = document.getElementById('clear__completed')

let LENGTH_TO_COMPLETE = 0
localStorage.getItem('id') === null
? localStorage.setItem('id', 0) 
: console.log('')

const saveLocalStorage = (key, value) => {
    localStorage.setItem(key, value)
}

const addTask = (task) => {
    const allTask = localStorage.getItem('all') !== null
        ? JSON.parse(localStorage.getItem('all'))
        : []
    const arrCopy = [...allTask, task]
    saveLocalStorage('all', JSON.stringify(arrCopy))
}

const filterTaskCompleted = (tasks) => {
    const filtered = tasks.filter(task => task.isCompleted)
    return filtered.length > 0 ? filtered : []
}

const filterTaskActives = (tasks) => {
    const filtered = tasks.filter(task => task.isCompleted === false)
    return filtered.length > 0 ? filtered : []
}

const checkedTask = e => {

    if (e.target.dataset.idTask === e.target.dataset.idtwoTask) {


        const el = document.querySelector(`[check="${e.target.dataset.idTask}"]`)
        el.classList.toggle('check__task--checked')

        const id = Number(e.target.dataset.idTask);
        const element = JSON.parse( localStorage.getItem('all') ).find(e => Number(e.id) === id)
        const pos = JSON.parse( localStorage.getItem('all') ).findIndex(e => Number(e.id) === id)
        element.isCompleted = element.isCompleted ? false : true

        const allTask = [...JSON.parse( localStorage.getItem('all') ) ]
        allTask.splice(pos, 1, element)
        saveLocalStorage('all', JSON.stringify(allTask) )

    }

}

const deleteTask = e => {

    if (e.target.dataset.btnTask === e.target.dataset.btntwoTask) {

        const idTask = Number(e.target.dataset.btnTask)
        const taskArrayNew = [...JSON.parse(localStorage.getItem('all') ) ].filter(e => e.id !== idTask) 

        saveLocalStorage('all', JSON.stringify(taskArrayNew)  )
        printTask( JSON.parse(localStorage.getItem('all') ) )

    }

}

const printTask = (task) => {

    const taskContent = document.getElementById('tasks')
    const fragment = document.createDocumentFragment();
    taskContent.innerHTML = ''

    if (task !== null) {

        task.forEach((taskElement) => {

            const div = document.createElement('div')
            const divChek = document.createElement('div')
            const h2 = document.createElement('h2')
            const button = document.createElement('button')

            divChek.setAttribute('id', 'check')
            taskElement.isCompleted
             ? divChek.setAttribute('class', 'check__task check__task--checked')
             : divChek.setAttribute('class', 'check__task')
            divChek.addEventListener('click', checkedTask)
            divChek.setAttribute('data-id-task', `${taskElement.id}`)
            divChek.setAttribute('data-idTwo-task', `${taskElement.id}`)
            divChek.setAttribute('check', `${taskElement.id}`)

            button.setAttribute('data-btn-task', `${taskElement.id}`)
            button.setAttribute('data-btnTwo-task', `${taskElement.id}`)
            button.setAttribute('class', 'task__delete_btn')
            button.addEventListener('click', deleteTask)
            button.textContent = 'X'

            h2.setAttribute('class', 'title__task')
            h2.textContent = taskElement.title


            div.setAttribute('class', 'task')
            div.appendChild(divChek)
            div.appendChild(h2)
            div.appendChild(button)

            fragment.appendChild(div)

        })

        taskContent.appendChild(fragment)
    }

    if (task.length === 0 && task !== null) {
        const h2 = document.createElement('h2')
        h2.textContent = 'Ninguna Tarea'

        taskContent.innerHTML = ''
        taskContent.appendChild(h2)

    }

}

addInput.addEventListener('keyup', e => {

    const KEY_CODE = e.key
    const titleTask = e.target.value

    if (KEY_CODE === 'Enter' && titleTask !== '') {

        let id = localStorage.getItem('all') === null
            ? 0
            : Number(localStorage.getItem('id')) + 1


        const task = {
            title: titleTask,
            isCompleted: false,
            id
        }

        localStorage.setItem('id', id)

        addTask(task)
        printTask(JSON.parse(localStorage.getItem('all')))

        e.target.value = ''

    }


})

addBtn.addEventListener('click', e => {


    const input = document.getElementById('add-input')
    const titleTask = input.value;

    let id = localStorage.getItem('all') === null
        ? 0
        : Number(localStorage.getItem('id')) + 1


    const task = {
        title: titleTask,
        isCompleted: false,
        id
    }

    localStorage.setItem('id', id)

    addTask(task)
    printTask(JSON.parse(localStorage.getItem('all')))

    input.value = ''



})

completedTask.addEventListener('click', e => {

    const allTask = JSON.parse(localStorage.getItem('all'))
    const completedTask = filterTaskCompleted(allTask)

    saveLocalStorage('completed', JSON.stringify(completedTask))
    const completedTaskFilter = JSON.parse(localStorage.getItem('completed'))
    printTask(completedTaskFilter)

})

allTask.addEventListener('click', e => {
    const data = JSON.parse(localStorage.getItem('all'))
    printTask(data)
})

taskActives.addEventListener('click', e => {

    const allTask = JSON.parse(localStorage.getItem('all'))
    const activesTask = filterTaskActives(allTask)

    saveLocalStorage('actives', JSON.stringify(activesTask))
    const activesTaskFilter = JSON.parse(localStorage.getItem('actives'))
    printTask(activesTaskFilter)

})

clearCompleted.addEventListener('click', e => {
    const allTask = JSON.parse(localStorage.getItem('all')).filter(e => !e.isCompleted)
    saveLocalStorage('all', JSON.stringify(allTask))
    printTask( JSON.parse( localStorage.getItem('all') ) )
})

const data = localStorage.getItem('all') !== null
    ? JSON.parse(localStorage.getItem('all'))
    : []
printTask(data)