<template>
    <div>
        Expense {{ $route.params.id }}
        <form @submit.prevent="onSubmit">
            <input type="hidden" name="name" value="test" />
            <input type="hidden" name="amount" value="1000" />
            <input type="hidden" name="icon" value="icon" />

            <button :disabled="loading">Submit</button>
        </form>
    </div>
</template>

<script setup lang="ts">
const loading = ref(false)
const onSubmit = async (e: any) => {
    loading.value = true
    const formData = new FormData(e.target);
    const results = await $fetch('/api/budgets', { method: 'post', body: formData })
    loading.value = false
    console.log(results.data)
}
definePageMeta({
    layout: 'dashboard',
    middleware: ['auth']
})
</script>

<style scoped></style>