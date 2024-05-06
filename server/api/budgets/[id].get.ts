import * as BudgetsRepository from '../../../database/BudgetRepository'
import z from 'zod'
export default defineEventHandler(async (event) => {
    try {
        const id = getRouterParam(event, 'id')
        const budgetId = z.coerce.number().parse(id)
        const cookies = parseCookies(event)
        const user = JSON.parse(cookies['user'])
        const email = user.email
        const emailSchema = z.object({
            email: z.string().email(),
        })
        emailSchema.parse({ email })
        const budgets = await BudgetsRepository.findBudgetByCreatedBy({ createdBy: email, id: budgetId })
        return {
            data: budgets.rows
        }
    } catch (e) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid id',
        })
    }
})