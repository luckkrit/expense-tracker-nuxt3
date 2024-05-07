export default defineNuxtRouteMiddleware((to, from) => {
    const user = useCookie('user')
    // if login then access backend
    if (from.path === '/' && to.path === '/' && (user.value !== null && user.value !== undefined)) {
        return navigateTo('/dashboard')
    }
    // if not login then redirect to index
    if ((from.path !== '/' && to.path !== '/') && (user.value === null || user.value === undefined)) {
        return navigateTo('/')
    }
})