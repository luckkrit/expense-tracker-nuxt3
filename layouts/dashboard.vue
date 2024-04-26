<template>
    <div class="flex">
        <div class="hidden md:block">
            <DashboardSideNav />
        </div>
        <main class="w-full">
            <DashboardHeader />
            <slot />
        </main>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>