import * as ExpenseRepository from '../../../database/ExpenseRepository'
import z from 'zod'
export default defineEventHandler(async (event) => {
    try {
        const id = getRouterParam(event, 'id')
        const expenseId = z.coerce.number().parse(id)
        await ExpenseRepository.deleteExpense(expenseId)
        return {
            data: null,
            error: null
        }
    } catch (e) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid id',
        })
    }
})