import * as ExpenseRepository from '../../../../database/ExpenseRepository'
import z from 'zod'
export default defineEventHandler(async (event) => {
    try {
        const id = getRouterParam(event, 'id')
        const budgetsId = z.coerce.number().parse(id)
        const expenses = await ExpenseRepository.findExpense({ budgetsId })
        return {
            data: expenses,
            error: null
        }
    } catch (e) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid id',
        })
    }
})