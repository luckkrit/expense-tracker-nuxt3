<template>
        <div class="p-10">
            <h2 class="text-3xl font-bold">My Budgets</h2>
            <!-- <BudgetList budgets={data.budgets} /> -->
            <DashboardBudgetList/>
        </div>
</template>

<script setup lang="ts">

definePageMeta({
    layout: 'dashboard',
    middleware: ['auth']
})

</script>

<style scoped></style>