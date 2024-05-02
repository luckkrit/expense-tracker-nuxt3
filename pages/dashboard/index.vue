<template>
    <div class="p-8">
        <h2 class="text-3xl font-bold">Hi,
            {{ user?.name || '' }}
            ✌️

        </h2>
        <p class="text-gray-500">Let's manage your budgets and expenses</p>
        <DashboardCardInfo :budgets="budgets" />
        <div class="grid grid-cols-1 gap-5 mt-6 md:grid-cols-3">
            <div class="md:col-span-2">
                <DashboardBarChart :budgets="budgets" />
                <DashboardExpenseList :refresh="refresh" :expenses="expenses" />
            </div>
            <div class="grid gap-5">
                <h2 class="text-lg font-bold">Latest Budgets</h2>
                <DashboardBudgetItem v-for="budget in budgets.slice(-7)" :key="budget.id" :budget="budget" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Budgets, Expenses } from '~/database/types';
definePageMeta({
    layout: 'dashboard',
    middleware: ['auth']
})
const user = useCookie<{ name: string, email: string }>('user')
const { data: budgetAndExpense } = await useLazyAsyncData('budget-expense', async () => {

    const [budgets, expenses] = await Promise.all([
        $fetch<{ data: Budgets[] }>('/api/budgets', { headers: useRequestHeaders(["cookie"]) as any }),
        $fetch<{ data: Expenses[] }>('/api/expenses', { headers: useRequestHeaders(["cookie"]) as any })
    ])

    return { budgets, expenses }
}, { transform: (_budgetAndExpense) => ({ budgets: _budgetAndExpense.budgets.data, expenses: _budgetAndExpense.expenses.data }) })

const budgetsRef = ref<Budgets[]>([])
const expensesRef = ref<Expenses[]>([])
const budgets = computed(() => budgetsRef.value)
const expenses = computed(() => expensesRef.value)

watch(budgetAndExpense, (data) => {
    if (data !== null) {
        budgetsRef.value = data.budgets
        expensesRef.value = data.expenses
    }
}, { deep: true })

const refresh = () => {
    refreshNuxtData('budget-expense');
}
</script>

<style scoped></style>