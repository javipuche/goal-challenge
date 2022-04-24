import { defineStore } from 'pinia'

const changeCompleted = (items, value) => {
    items.forEach(item => {
        item.completed = value
    })
}

const getRandomId = () => (performance.now().toString(36)+Math.random().toString(36)).replace(/\./g,"")

const createNewTask = (title) => ({
    id: getRandomId(),
    title,
    completed: false
})

export const useTodoStore = defineStore('todo', {
    persist: true,
    state: () => ({
        items: [
            {
                id: 0,
                title: 'Task #1',
                completed: false
            },
            {
                id: 1,
                title: 'Task #2',
                completed: true
            },
            {
                id: 2,
                title: 'Task #3',
                completed: false
            }
        ]
    }),
    getters: {
        active: (state) => state.items.filter(item => !item.completed),
        completed: (state) => state.items.filter(item => item.completed),
        countActiveTasks: (state) => state.active.length,
        countCompletedTasks: (state) => state.completed.length
    },
    actions: {
        uncompleteAll () {
            changeCompleted(this.items, false)
        },
        completeAll () {
            changeCompleted(this.items, true)
        },
        addNewTask (value) {
            const title = value?.trim()
            if (!title) return
            this.items = [createNewTask(title), ...this.items]
        },
        deleteCompletedTask (id) {
            this.items = this.items.filter(item => item.id !== id || !item.completed)
        },
        deleteTask (id) {
            this.items = this.items.filter(item => item.id !== id)
        },
        clearCompletedTasks () {
            this.items = this.items.filter(item => !item.completed)
        }
    }
})
