import * as BudgetRepository from '../../database/BudgetRepository'
export default defineEventHandler(async (event) => {
    const budgets = await BudgetRepository.findBudget({})
    return {
        data: budgets
    }
})