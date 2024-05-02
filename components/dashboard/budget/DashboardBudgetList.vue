<template>
        <div class='mt-7'>
            <div class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                <DashboardBugetCreate/>
                <!-- <CreateBudget />
                {isLoading ? Array.from({ length: 6 }, (_, i) => (i)).map((i) => <BudgetItemSkeleton key={i} />) :
                    budgets.map((budget: Budgets) => (<BudgetItem budget={budget} key={budget.id} />))
                } -->
            </div>
        </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>