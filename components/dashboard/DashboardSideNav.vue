<template>
    <aside class="flex flex-col justify-between h-screen p-5 border shadow-sm min-w-60">
        <div>
            <img src="../../assets/images/logo.svg" width="71" height="55" alt="logo" class="mx-auto" />
            <div class="mt-5">
                <NuxtLink :to="menu.path"
                    class="flex items-center gap-2 p-5 font-medium text-gray-500 border border-transparent cursor-pointer hover:border hover:rounded-md hover:text-blue-700 hover:bg-blue-100"
                    activeClass="border rounded-md text-blue-700 bg-blue-100"
                    exactActiveClass="border rounded-md text-blue-700 bg-blue-100" 
                    v-for="menu in menuList"
                    :key="menu.id">
                    <component :is="menu.icon" />
                    {{ menu.name }}
                </NuxtLink>
            </div>
        </div>
        <div class="flex justify-center w-full mb-5">
            <AuthButton />
        </div>
    </aside>
</template>

<script setup lang="ts">
import { PhPiggyBank } from "@kalimahapps/vue-icons";
import { LuLayoutGrid } from "@kalimahapps/vue-icons";
import { LuReceiptText } from "@kalimahapps/vue-icons";
import { LuShieldCheck } from "@kalimahapps/vue-icons";
import { RouterLink } from 'vue-router';
import type { MenuItem } from '~/global';

const menuList: MenuItem[] = [
    {
        id: 1,
        name: 'Dashboard',
        icon: LuLayoutGrid,
        path: '/dashboard',
        end: true
    },
    {
        id: 2,
        name: 'Budgets',
        icon: PhPiggyBank,
        path: '/dashboard/budgets',
        end: true
    },
    {
        id: 3,
        name: 'Expenses',
        icon: LuReceiptText,
        path: '/dashboard/expenses',
        end: false
    },
    {
        id: 4,
        name: 'Upgrade',
        icon: LuShieldCheck,
        path: '/dashboard/upgrade',
        end: true
    }
]
</script>

<style scoped></style>