<template>
    <label class="checkbox">
        <input
            type="checkbox"
            class="checkbox__element"
            :checked="modelValue"
            @change="$emit('update:modelValue', $event.target.checked)"
        >
        <div
            class="checkbox__box"
            :class="{ 'checkbox__box--checked' : modelValue }"
        >
            <div
                class="checkbox__check-box"
                :class="{ 'checkbox__check-box--checked' : modelValue }"
            >
                <div
                    class="checkbox__check"
                    :class="{ 'checkbox__check--visible' : modelValue }"
                >
                    ✔
                </div>
            </div>
            <div v-if="$slots.default" class="checkbox__content">
                <slot :checked="modelValue" />
            </div>
        </div>
    </label>
</template>

<script>
    export default {
        props: {
            modelValue: {
                type: Boolean,
                default: false
            }
        },
        emits: ['update:modelValue']
    }
</script>

<style lang="scss">
  .checkbox {
    display: block;

    &__box {
      display: grid;
      grid-auto-flow: column;
      grid-gap: 16px;
      justify-content: start;

      &--checked {
        border-color: var(--color-primary);
      }
    }

    &__check-box {
      height: 24px;
      width: 24px;
      border: 1px solid var(--color-border);
      border-radius: 4px;
      background-color: #fff;
      transform: translateY(-0.07em);
      position: relative;
      user-select: none;

      &--checked {
        border-color: var(--color-primary);
        color: var(--color-primary);
      }

      svg {
        display: initial !important;
      }
    }

    &__check {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;

      &--visible {
        opacity: 1;
      }
    }

    &__element {
      display: none;
    }
  }
</style>
