<template>
        <div class='mt-7'>
            <div class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                <DashboardBudgetCreate/>
                <DashboardBudgetItemSkeleton v-if="pending" v-for="j in Array.from({length:6}, (_,i)=>(i))" :key="j" />
                <DashboardBudgetItem v-if="!pending" v-for="budget in budgets" :key="budget.id" :budget="budget" />
            </div>
        </div>
</template>

<script setup lang="ts">
import type { Budgets } from '~/database/types';


const props = defineProps<{pending:boolean, budgets:Budgets[]}>()
</script>

<style scoped>

</style>