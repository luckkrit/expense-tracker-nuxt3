<template>
    <!-- <div>
        Expense {{ $route.params.id }}
        <form @submit.prevent="onSubmit">
            <input type="hidden" name="name" value="test" />
            <input type="hidden" name="amount" value="1000" />
            <input type="hidden" name="icon" value="icon" />

            <button :disabled="loading">Submit</button>
        </form>
    </div> -->
        <div class="p-10">
            <h2 class="flex items-center justify-between text-2xl font-bold">My Expenses 
                <div class="flex gap-2">

                    <!-- <DeleteBudget budgetId={data.budget.id} />
                    <EditBudget budget={data.budget} /> -->
                </div>
            </h2>
            <div class="grid grid-cols-1 gap-5 mt-6 md:grid-cols-2">
                <DashboardBudgetItemSkeleton v-if="pendingRef"/>
                <DashboardBudgetItem :budget="budgets" v-if="!pendingRef" />
                <!-- {isLoading ?
                    <BudgetItemSkeleton />
                    :
                    <BudgetItem budget={data.budget} />
                }
                <AddExpense budgetId={data.budget.id} /> -->
            </div>
            <div class="mt-4">
                <!-- {isLoading ?
                    <ExpenseSkeleton />
                    :
                    <ExpenseListTable expenses={data.expenses} />
                } -->
                <DashboardExpenseListSkeleton v-if="pendingRef" />
                <DashboardExpenseList :refresh="refresh" :expenses="expenses" v-if="!pendingRef" />
            </div>
        </div>
</template>

<script setup lang="ts">
import type { Budgets, Expenses } from '~/database/types';

// const loading = ref(false)
// const onSubmit = async (e: any) => {
//     loading.value = true
//     const formData = new FormData(e.target);
//     const results = await $fetch('/api/budgets', { method: 'post', body: formData })
//     loading.value = false
//     console.log(results.data)
// }
definePageMeta({
    layout: 'dashboard',
    middleware: ['auth']
})
const route = useRoute()
const budgetId = route.params.id


const { pending,data: budgetAndExpense } = await useLazyAsyncData('budget-expense2', async () => {

    const [budgets, expenses] = await Promise.all([
        $fetch<{ data: Budgets[] }>('/api/budgets/'+budgetId, { headers: useRequestHeaders(["cookie"]) as any }),
        $fetch<{ data: Expenses[] }>('/api/expenses/budgets/'+budgetId)
    ])
    return { budgets, expenses }
}, { transform: (_budgetAndExpense) => ({ budgets: _budgetAndExpense.budgets.data, expenses: _budgetAndExpense.expenses.data }) })

const budgetsRef = ref<Budgets>({id:0, name:'', amount:'',createdBy:'',icon:'',totalItem:'',totalSpend:''})
const expensesRef = ref<Expenses[]>([])
const budgets = computed(() => budgetsRef.value)
const expenses = computed(() => expensesRef.value)

watch(() => budgetAndExpense.value, (newBudgetAndExpenses, _) => {
    if(newBudgetAndExpenses!==null){
        if(newBudgetAndExpenses.budgets.length>0){
        budgetsRef.value = newBudgetAndExpenses.budgets[0]
        }
        expensesRef.value = newBudgetAndExpenses.expenses
    }
}, {deep: true});

const pendingRef = ref<boolean>(false)
watch(()=>pending.value, (newPending)=>{
    pendingRef.value = newPending
})


const refresh = () => {
    refreshNuxtData('budget-expense2');
}
</script>

<style scoped></style>