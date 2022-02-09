const allTask = []
const tasksCompledted = []
const taskToComplete = []
const addInput = document.getElementById('add-input')
const addBtn = document.getElementById('add_btn')
let LENGTH_TO_COMPLET = 0

const saveLocalStorage = (key, value)  => {
    localStorage.setItem(key, value)
}

const addTask = (task) => allTask.concat(task)

addInput.addEventListener('keyup', e => {

    const KEY_CODE = e.key
    const titleTask = e.target.value
    console.log(KEY_CODE, titleTask)

    if (KEY_CODE === 'Enter') {

        const task = {
            title: titleTask,
            isCompleted: false
        }

        const arrResult = addTask(task)
        saveLocalStorage('all', JSON.stringify(arrResult))
        
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

    const arrResult = addTask(task)
    saveLocalStorage('all', JSON.stringify(arrResult))

    input.value = ''

})



