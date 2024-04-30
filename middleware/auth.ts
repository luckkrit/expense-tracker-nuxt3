export default defineNuxtRouteMiddleware((to, from) => {
    const user = useCookie('user')
    if (from.path === '/' && user.value !== undefined && user.value !== null) {

        return navigateTo('/dashboard')
    }
})