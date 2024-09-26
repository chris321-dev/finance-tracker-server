import express, { Express } from 'express'
import mongoose from 'mongoose'
import FinancialRecordModel from './schema/financial-record'
import financialRecordRouter from './routes/financial-records'
import cors from 'cors'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3001

app.use(express.json())
app.use(cors({
  origin: 'https://finance-tracker-client-dun.vercel.app',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
  proxy: true
}));


const mongoURI: string = process.env.MONGO_URI || "" // use the environment variable

if (!mongoURI) {
    console.error("Mongo URI is not defined in the environment file.");
    process.exit(1); // exit the application if the URI is missing
}

mongoose.connect(mongoURI)
    .then(() => console.log("CONNECTED TO MONGODB!"))
    .catch((err) => console.error("Failed to connect to MongoDB:", err))

app.use("/financial-records", financialRecordRouter)

app.listen(port, () => {
    console.log(`Server Running on Port ${port}`)
})
