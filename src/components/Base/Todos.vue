<template>
    <div class="todos">
        <div class="todos__box">
            <div class="todos__check">
                <Checkbox
                    v-show="showCheckAll"
                    v-model="checkIsActive"
                    @click.prevent="$emit('clickCheckAll')"
                />
            </div>
            <form class="todos__form" @submit.prevent="$emit('submit', inputValue)">
                <input
                    ref="inputElement"
                    v-model="inputValue"
                    class="todos__input"
                    placeholder="What needs to be done?"
                >
            </form>
        </div>
        <div v-show="showFooter" class="todos__wrapper">
            <slot />
            <div class="todos__footer">
                <i18n-t keypath="itemsLeft" tag="div" :plural="countActiveItems" scope="global">
                    <template #count>
                        <strong>{{ countActiveItems }}</strong>
                    </template>
                </i18n-t>
                <div class="todos__filters">
                    <button
                        class="todos__filter"
                        :class="{ 'todos__filter--active' : activeFilter === 'all' }"
                        @click="$emit('clickFilter', 'all')"
                    >
                        All
                    </button>
                    <button
                        :disabled="!(countActiveItems)"
                        class="todos__filter"
                        :class="{ 'todos__filter--active' : activeFilter === 'active' }"
                        @click="$emit('clickFilter', 'active')"
                    >
                        Active
                    </button>
                    <button
                        :disabled="!(countCompletedItems)"
                        class="todos__filter"
                        :class="{ 'todos__filter--active' : activeFilter === 'completed' }"
                        @click="$emit('clickFilter', 'completed')"
                    >
                        Completed
                    </button>
                </div>
                <button
                    v-if="countCompletedItems && activeFilter !== 'active'"
                    @click="$emit('clickClearCompletedTasks')"
                >
                    Clear completed
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import Checkbox from '@/components/Base/Checkbox.vue'
    import { computed, onMounted, ref } from 'vue'

    const props = defineProps({
        modelValue: {
            type: String,
            default: undefined
        },
        activeFilter: {
            type: String,
            default: 'all'
        },
        countActiveItems: {
            type: Number,
            default: 0
        },
        countCompletedItems: {
            type: Number,
            default: 0
        },
        showFooter: {
            type: Boolean,
            default: false
        },
        showCheckAll: {
            type: Boolean,
            default: false
        },
        checkAllIsActive: {
            type: Boolean,
            default: false
        },
        focusInput: {
            type: Boolean,
            default: false
        }
    })

    const emit = defineEmits([
        'update:checkAllIsActive',
        'clickClearCompletedTasks',
        'submit',
        'update:modelValue',
        'clickFilter',
        'clickCheckAll'
    ])

    const inputElement = ref(null)

    const inputValue = computed({
        get: () => props.modelValue,
        set: (value) => {
            emit('update:modelValue', value)
        }
    })

    const checkIsActive = computed({
        get: () => props.checkAllIsActive,
        set: (value) => {
            emit('update:checkAllIsActive', value)
        }
    })

    onMounted(() => {
        if (props.focusInput && inputElement.value) inputElement.value.focus()
    })
</script>

<style lang="scss" scoped>
  .todos {
    background-color: var(--color-card-background);
    box-shadow: var(--shadow-100);

    &__box {
      display: grid;
      grid-template-columns: 24px 1fr;
      align-items: center;
      padding-left: 8px;
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
    }

    &__wrapper {
      border-top: 1px solid var(--color-border);
    }

    &__filters {
      display: grid;
      grid-auto-flow: column;
      grid-gap: 8px;
    }

    &__filter {
      padding: 4px;

      &:disabled {
        opacity: 0.2;
      }

      &--active {
        border: 1px solid var(--color-border);
      }
    }

    &__footer {
      border-top: 1px solid var(--color-border);
      font-size: 12px;
      display: grid;
      grid-template-columns: auto 1fr minmax(88px, auto);
      grid-gap: 16px;
      justify-items: center;
      align-items: center;
      padding: 8px;
    }
  }

</style>
