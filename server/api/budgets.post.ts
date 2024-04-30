import { NewBudgets } from '~/database/types';
import * as BudgetRepository from '../../database/BudgetRepository';

export default defineEventHandler(async (event) => {
    try {

        const body = await readMultipartFormData(event);
        let formData: FormData = new FormData()
        if (body !== undefined) {
            body.forEach(element => {
                if (element.name !== undefined) {
                    formData.append(element.name, element.data.toString())
                }
            });
        }
        const name = String(formData.get('name'))
        const amount = String(formData.get('amount') || 0)
        const icon = String(formData.get('icon'))
        const budgets: NewBudgets = { name, amount, icon, createdBy: 'luckkrit@gmail.com' }
        await BudgetRepository.createBudget(budgets)
        return {
            data: null,
            error: null
        }
    } catch (e) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Something went wrong'
        })
    }

})