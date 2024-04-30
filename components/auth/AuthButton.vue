<template>

    <div v-if="user === null || user === undefined">
        <button class='w-full px-3 py-2 text-white bg-red-700 border rounded-md' @click="login">Login with
            Google</button>
    </div>
    <div v-if="user !== null && user !== undefined">
        <button class='w-full px-3 py-2 text-white bg-red-700 border rounded-md' @click="logout">Logout</button>
    </div>
</template>

<script setup lang="ts">
const user = useCookie<{ name: string, email: string } | null>('user')
const login = async () => {
    user.value = { name: 'Krit Chomaitong', email: 'luckkrit@gmail.com' }
    await navigateTo('/dashboard')
}

const logout = async () => {
    user.value = null
    await navigateTo('/')
}
</script>

<style scoped></style>