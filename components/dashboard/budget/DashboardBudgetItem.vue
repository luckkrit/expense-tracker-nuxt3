<template>
    <RouterLink :to="'/dashboard/expenses/' + budget.id">
        <div className='p-5 border rounded-lg gap-2 hover:shadow-md cursor-pointer h-44'>

            <div className='flex gap-2 items-center justify-between'>
                <div className='flex gap-2 items-center'>
                    <h2 className='text-3xl p-2 bg-slate-100 rounded-full'>{{ budget.icon }}</h2>
                    <div>
                        <h2 className='font-bold'>{{ budget.name }}</h2>
                        <h2 className='text-sm text-gray-500'>{{ budget.totalItem || 0 }} Item</h2>
                    </div>
                </div>
                <h2 className='font-bold text-blue-700 text-lg'>${{ budget.amount === "null" ? 0 : budget.amount }}</h2>
            </div>
            <div className='mt-5'>
                <div className='flex items-center justify-between mb-3'>
                    <h2 className='text-xs text-slate-400'>${{ budget.totalSpend }} Spend</h2>
                    <h2 className='text-xs text-slate-400'>${{ Number(budget.amount) - Number(budget.totalSpend || '0')
                        }}
                        Remaining</h2>
                </div>
                <div className='w-full bg-slate-300 h-2 rounded-full'>
                    <div class="h-2 bg-blue-700 rounded-full"
                        :style="{ width: (Number(budget.totalSpend || '0')) * 100 / Number(budget.amount === 'null' ? 0 : budget.amount) + '%' }">

                    </div>
                </div>
            </div>
        </div>
    </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import type { Budgets } from '~/database/types';
defineProps<{ budget: Budgets }>()

</script>

<style scoped></style>