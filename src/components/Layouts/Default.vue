<template>
    <div class="layout-default">
        <div class="layout-default__container">
            <slot />
        </div>
    </div>
</template>

<style lang="scss" scoped>
  .layout-default {
    padding: 40px;
    min-height: 100vh;
    background-color: var(--color-body-background);

    &__container {
      max-width: 400px;
      margin-left: auto;
      margin-right: auto;
    }
  }
</style>
