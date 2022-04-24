<template>
    <Todos
        v-model="taskTitle"
        v-model:checkAllIsActive="checkAllIsActive"
        :show-check-all="!!items.length"
        :show-footer="!!items.length"
        :count-active-items="todo.countActiveTasks"
        :count-completed-items="todo.countCompletedTasks"
        :active-filter="selectedFilter"
        @click-clear-completed-tasks="clearCompletedTasks"
        @click-filter="filterBy"
        @click-check-all="checkAll"
        @submit="addNewTask"
    >
        <Todo
            v-for="item in items"
            :id="item.id"
            :key="`${item.id}${item.completed}`"
            v-model="item.title"
            v-model:completed="item.completed"
            @edit="editedTask"
            @delete="todo.deleteCompletedTask(item.id)"
        />
    </Todos>
</template>

<script setup>
    import Todos from '@/components/Base/Todos.vue'
    import Todo from '@/components/Base/Todo.vue'
    import { useTodoStore } from '@/stores/todo'
    import { ref, watch } from 'vue'
    import { computed } from '@vue/reactivity'

    const props = defineProps({
        selectedFilter: {
            type: String,
            default: 'all'
        }
    })

    const emit =  defineEmits(['filter'])

    const todo = useTodoStore()
    const checkAllIsActive = ref(false)
    const taskTitle = ref('')
    const items = computed(() => todo[props.selectedFilter] || todo.items)

    const addNewTask = (title) => {
        todo.addNewTask(title)
        taskTitle.value = undefined
        if (props.selectedFilter === 'completed') emit('filter', 'all')
    }

    const editedTask = (value) => {
        if (!value?.title) todo.deleteTask(value.id)
    }

    const filterBy = (status) => {
        emit('filter', status)
    }

    const clearCompletedTasks = () => {
        todo.clearCompletedTasks()
        emit('filter', 'all')
    }

    const checkAll = () => {
        checkAllIsActive.value = !checkAllIsActive.value
        checkAllIsActive.value
            ? todo.completeAll()
            : todo.uncompleteAll()
    }

    watch(items, (items) => {
        checkAllIsActive.value = todo.countCompletedTasks === items.length
        if (props.selectedFilter === 'completed' && !todo.countCompletedTasks) emit('filter', 'all')
    }, {
        immediate: true,
        deep: true
    })
</script>
