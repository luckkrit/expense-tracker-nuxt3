import * as BudgetRepository from '../../../database/BudgetRepository'
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
        const budgets = await BudgetRepository.findBudgetByCreatedBy({ createdBy: email })
        return {
            data: budgets.rows
        }
    } catch (e) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid email',
        })
    }
})

