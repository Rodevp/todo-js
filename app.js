const addInput = document.getElementById('add-input')
const addBtn = document.getElementById('add_btn')
let LENGTH_TO_COMPLETE = 0

const saveLocalStorage = (key, value) => {
    localStorage.setItem(key, value)
}

const addTask = (task) => {
    const allTask = localStorage.getItem('all') !== null
    ? JSON.parse( localStorage.getItem('all') )
    : []
    const arrCopy = [...allTask, task]
    saveLocalStorage('all', JSON.stringify( arrCopy ) )
}

const checkTask = e => {

    e.stopPropagation()

    const checkDiv = document.getElementById('check__task')

    checkDiv.classList.toggle('checked')

    console.log('click')

}


const printTask = (task) => {

    const taskContent = document.getElementById('task')
    const fragment = document.createDocumentFragment();
    taskContent.innerHTML = ''
    
    if (task !== null) {
        
        task.forEach(taskElement => {
            
            const div = document.createElement('div')
            const divChek = document.createElement('div')
            const h2 = document.createElement('h2')
            const button = document.createElement('button')

            divChek.setAttribute('id', 'check__task')
            divChek.setAttribute('class','check__task')
            divChek.addEventListener('click', checkTask)

            div.setAttribute('class','task')
            h2.setAttribute('class','title__task')
            button.setAttribute('class','task__delete_btn')

            h2.textContent = taskElement.title
            button.textContent = 'X'

            div.appendChild(divChek)
            div.appendChild(h2)
            div.appendChild(button)

            fragment.appendChild(div)

        })

        taskContent.appendChild(fragment)
    }
    
}

addInput.addEventListener('keyup', e => {

    const KEY_CODE = e.key
    const titleTask = e.target.value

    if (KEY_CODE === 'Enter' && titleTask !== '') {

        let task = {
            title: titleTask,
            isCompleted: false
        }

        addTask(task)
        printTask(JSON.parse(localStorage.getItem('all')))

        task = {}

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

const data = JSON.parse(localStorage.getItem('all')) 
printTask(data)