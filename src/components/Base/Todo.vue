<template>
    <div
        class="todo"
        @mouseenter="showDeleteButton"
        @mouseleave="isDeleteBtnVisible = false"
    >
        <div class="todo__check">
            <Checkbox v-show="!isEditable" v-model="isCompleted" />
        </div>
        <input
            ref="inputElement"
            v-model="title"
            type="text"
            class="todo__input"
            :class="{
                'todo__input--editable' : isEditable,
                'todo__input--completed' : isCompleted
            }"
            :readonly="!isEditable"
            @dblclick="enableEdit"
            @keyup.enter="editTask($event.target.value)"
            @keyup.escape="cancelEdit"
            @blur="editTask($event.target.value)"
        >
        <button
            v-show="isDeleteBtnVisible"
            class="todo__delete"
            @click="deleteTask"
        >
            ✕
        </button>
    </div>
</template>

<script setup>
    import Checkbox from '@/components/Base/Checkbox.vue'
    import { computed } from '@vue/reactivity'
    import { ref } from 'vue'

    const props = defineProps({
        id: {
            type: [String, Number],
            default: undefined
        },
        modelValue: {
            type: String,
            default: undefined
        },
        completed: {
            type: Boolean,
            default: false
        }
    })

    const emit = defineEmits(['update:modelValue', 'update:completed', 'delete', 'edit'])

    const isEditable = ref(false)
    const isDeleteBtnVisible = ref(false)
    const inputElement = ref(null)
    const isCancel = ref(false)

    const title = computed({
        get: () => props.modelValue,
        set: (value) => {
            emit('update:modelValue', value)
        }
    })

    const isCompleted = computed({
        get: () => props.completed,
        set: (value) => {
            emit('update:completed', value)
        }
    })

    const originalTitle = ref(title.value)

    const enableEdit = () => {
        if (!isCompleted.value) isEditable.value = true
    }

    const editTask = (value) => {
        isEditable.value = false

        if (!isCancel.value) {
            title.value = value
            originalTitle.value = value
            emit('edit', { id: props.id, title: value, completed: isCompleted.value })
        }

        isCancel.value = false
    }

    const showDeleteButton = () => {
        isDeleteBtnVisible.value = isCompleted.value
    }

    const deleteTask = () => {
        emit('delete')
    }

    const cancelEdit = () => {
        title.value = originalTitle.value
        isCancel.value = true
        inputElement.value.blur()
    }
</script>

<style lang="scss" scoped>
  .todo {
    display: grid;
    grid-template-columns: 24px 1fr;
    grid-auto-flow: column;
    align-items: center;
    padding-left: 8px;

    & + & {
      border-top: 1px solid var(--color-border-secondary);
    }

    &__input {
      appearance: none;
      border: 0;
      outline: none;
      height: 40px;
      width: 100%;
      padding-left: 16px;
      padding-right: 16px;
      font-size: inherit;

      &::placeholder {
        color: var(--color-placeholder);
        font-style: italic;
      }

      &--editable {
        border: 1px solid var(--color-border);
      }

      &--completed {
        text-decoration: line-through;
        color: var(--color-placeholder);
      }
    }

    &__delete {
      width: 24px;
      display: flex;
      justify-content: center;
      color: red;
    }
  }
</style>
