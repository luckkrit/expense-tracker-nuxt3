export default defineNuxtRouteMiddleware((to, from) => {
    const user = useCookie('user')
    if (from.path === '/' && to.path === '/' && (user.value !== null && user.value !== undefined)) {
        return navigateTo('/dashboard')
    }
    // if not login then cannot access backend
    if ((from.path !== '/' && to.path !== '/') && (user.value === null || user.value === undefined)) {
        return navigateTo('/')
    }
})