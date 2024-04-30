import * as ExpenseRepository from '../../../database/ExpenseRepository'
import z from 'zod'
export default defineEventHandler(async (event) => {
    try {
        const cookies = parseCookies(event)
        const user = JSON.parse(cookies['user'])
        const email = user.email
        const emailSchema = z.object({
            email: z.string().email(),
        })
        emailSchema.parse({ email })
        const expenses = await ExpenseRepository.findExpense({ createdBy: email })
        return {
            data: expenses
        }
    } catch (e) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid email',
        })
    }
})