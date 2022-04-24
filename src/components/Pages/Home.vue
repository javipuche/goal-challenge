<template>
    <LayoutDefault>
        <div class="page-home">
            <div class="page-home__title">
                Todos
            </div>
            <ContainerTodos
                focus-input
                :selected-filter="filter"
                @filter="$router.push({ name: $event })"
            />
        </div>
    </LayoutDefault>
</template>

<script setup>
    import LayoutDefault from '@/components/Layouts/Default.vue'
    import ContainerTodos from '@/components/Containers/ContainerTodos.vue'
    import { useRoute } from 'vue-router'

    const route = useRoute()
    const filter = route.name
</script>

<style lang="scss">
  .page-home {
    &__title {
      text-align: center;
      margin-bottom: 40px;
      color: #db5034;
      font-size: 40px;
    }
  }
</style>
