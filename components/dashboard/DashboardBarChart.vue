<template>
    <div class="w-full h-80">
        <canvas ref="budgetsChartEL"></canvas>
    </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, computed, watch, nextTick, onMounted } from 'vue';
import Chart from 'chart.js/auto';
import type { Budgets } from '~/database/types';

const props = defineProps<{ budgets: Budgets[] }>()
const refBudgets = ref(props.budgets)

const budgetsChartEL = ref<HTMLCanvasElement | null>(null)
const budgetsChart = shallowRef<Chart<"bar", number[], string> | null>(null)
watch(() => props.budgets, (newBudgets, _) => {
    const ws = [...newBudgets]
    if (budgetsChart.value !== null) {
        budgetsChart.value.data.labels = ws
            .map(budget => budget.name)
            .slice(-7)

        budgetsChart.value.data.datasets[0].data = ws
            .map(budget => budget.totalSpend === 'null' ? 0 : Number(budget.totalSpend))
            .slice(-7)
        budgetsChart.value.data.datasets[1].data = ws
            .map(budget => budget.amount === 'null' ? 0 : Number(budget.amount))
            .slice(-7)

        budgetsChart.value.update()
        return
    }
}, { deep: true })
onMounted(() => {
    const context = budgetsChartEL.value?.getContext('2d')

    if (context !== null && context !== undefined) {

        budgetsChart.value = new Chart(context, {
            type: 'bar',
            data: {
                labels: refBudgets.value.map((budget) => budget.name).slice(-7),
                datasets: [
                    {
                        label: 'Total Spend',

                        data: refBudgets.value.map((budget) => Number(budget.totalSpend === "null" ? 0 : budget.totalSpend)).slice(-7),
                        backgroundColor: 'rgba(48, 213, 200, 0.2)', // Lighter version of #30D5C8 in RGBA
                        borderColor: 'rgba(48, 213, 200, 1)', // Solid color for the border
                        borderWidth: 1,
                        parsing: {
                            xAxisKey: 'totalSpend'
                        }

                    },
                    {
                        label: 'Amount',
                        data: refBudgets.value.map((budget) => Number(budget.amount === "null" ? 0 : budget.amount)).slice(-7),

                        backgroundColor: 'rgba(213, 48, 200, 0.2)', // Lighter version of #30D5C8 in RGBA
                        borderColor: 'rgba(48, 213, 200, 1)', // Solid color for the border
                        borderWidth: 1,
                        parsing: {
                            xAxisKey: 'amount'
                        }
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        stacked: true,
                    },
                    y: {
                        stacked: true
                    }
                }
            }
        })
    }
})
</script>

<style scoped></style>