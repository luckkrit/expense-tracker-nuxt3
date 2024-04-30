<template>
    <div class='grid grid-cols-1 gap-5 mt-7 md:grid-cols-2 lg:grid-cols-3'>
        <div class='flex items-center justify-between border rounded-lg p-7'>
            <div>
                <h2 class="text-sm">Total Budget</h2>
                <h2 class="text-2xl font-bold">${{ budgets.reduce((ac: number, v: Budgets) => (ac +
                    Number(v.amount === "null" ? 0 : v.amount)),
                    0) }}</h2>
            </div>
            <PhPiggyBank class='w-12 h-12 p-3 text-white bg-blue-700 rounded-full' />
        </div>
        <div class='flex items-center justify-between border rounded-lg p-7'>
            <div>
                <h2 class="text-sm">Total Spend</h2>
                <h2 class="text-2xl font-bold">${{ budgets.reduce((ac: number, v: Budgets) => (ac +
                    Number(v.totalSpend)), 0) }}</h2>
            </div>
            <LuReceiptText class='w-12 h-12 p-3 text-white bg-blue-700 rounded-full' />
        </div>
        <div class='flex items-center justify-between border rounded-lg p-7'>
            <div>
                <h2 class="text-sm">No. Items</h2>
                <h2 class="text-2xl font-bold">{{ budgets.length }}</h2>
            </div>
            <LuWallet class='w-12 h-12 p-3 text-white bg-blue-700 rounded-full' />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Budgets } from '~/database/types';
import { PhPiggyBank } from "@kalimahapps/vue-icons";
import { LuReceiptText } from "@kalimahapps/vue-icons";
import { LuWallet } from '@kalimahapps/vue-icons'
defineProps<{ budgets: Budgets[] }>()
</script>

<style scoped></style>