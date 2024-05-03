<template>
        <div class="p-10">
            <h2 class="text-3xl font-bold">My Budgets</h2>
            <!-- <BudgetList budgets={data.budgets} /> -->
            <DashboardBudgetList :pending="pendingRef" :budgets="budgetsRef"/>
        </div>
</template>

<script setup lang="ts">
import type { Budgets } from '~/database/types';


definePageMeta({
    layout: 'dashboard',
    middleware: ['auth']
})
const { pending, data: budgets } = await useLazyAsyncData('budgets', () => $fetch<{data:Budgets[]}>('/api/budgets'),{transform: (_budgets)=>_budgets.data})
const budgetsRef = ref<Budgets[]>([]);
const pendingRef = ref<boolean>(true);
watch(budgets, (newBudgets) => {
  if(newBudgets!==null){
    budgetsRef.value = newBudgets
  }
},{deep: true})
watch(pending, (newPending, oldPending)=>{
    pendingRef.value = newPending
})
</script>

<style scoped></style>