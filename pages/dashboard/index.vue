<template>
    <div>
        Dashboard show
    </div>
    <ul>
        <li v-if="!pending" v-for="budget in budgets" :key="budget.id">
            name = {{ budget.name }}
        </li>
    </ul>
    <p>
        {{ error }}
    </p>
</template>

<script setup lang="ts">

definePageMeta({
    layout: 'dashboard'
})
const { pending, data: budgets, error } = await useLazyFetch('/api/budgets', {
    transform: (_budgets) => (_budgets.data)
})
</script>

<style scoped></style>