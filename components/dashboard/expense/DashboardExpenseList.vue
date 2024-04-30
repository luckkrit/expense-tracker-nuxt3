<template>
    <div>
        <h2 class="text-lg font-bold">Latest Expenses</h2>
        <div class='mt-3'>
            <div class='grid grid-cols-4 p-2 bg-slate-200'>

                <h2>Name</h2>
                <h2>Amount</h2>
                <h2>Date</h2>
                <h2>Action</h2>
            </div>
            <div v-for="expense in expenses" :key="expense.id" class="grid grid-cols-4 p-2">
                <h2>{{ expense.name }}</h2>
                <h2>{{ expense.amount }}</h2>
                <h2>{{ dayjs(expense.created_at).format('DD/MM/YYYY') }}</h2>
                <h2>
                    <button @click="onDelete(expense.id)">
                        <LuTrash class='text-red-600' />
                    </button>
                </h2>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Expenses } from '~/database/types';
import dayjs from 'dayjs'
import { LuTrash } from "@kalimahapps/vue-icons";

const props = defineProps<{ expenses: Expenses[], refresh: () => void }>()

const onDelete = async (id: number) => {
    const data = await $fetch<{ data: null | string, error: null | string }>('/api/expenses/' + id, { method: 'delete', headers: useRequestHeaders(["cookie"]) as any })
    if (data.data === null) {
        props.refresh()
    }

}


</script>

<style scoped></style>