import mongoose from 'mongoose'

interface FinancialRecord {
    userId: string
    date: String
    description: string
    amount: number
    category: string
    paymentMethod: string
}

const financialRecordSchema = new mongoose.Schema<FinancialRecord>({
    userId: { type: String, required: true},
    date: { 
        type: String, // Store date as a string in 'YYYY-MM-DD'
        required: true
      },    
    description: { type: String, required: true},
    amount: { type: Number, required: true},
    category: { type: String, required: true},
    paymentMethod: { type: String, required: true},
})

const FinancialRecordModel = mongoose.model<FinancialRecord>('FinancialRecord', financialRecordSchema)

export default FinancialRecordModel