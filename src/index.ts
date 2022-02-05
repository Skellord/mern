import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import 'dotenv/config'
import unitRouter from '../routes/unit.routes'

const PORT = process.env.PORT || 5000

const app: Application = express()

app.use(cors())
app.use('/units', unitRouter)

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || '')
        app.listen(PORT, () => console.log(`Server start on port ${PORT}`))
    } catch (e) {
        console.log('Server error', e)
        process.exit(1)
    }
}
app.get('/', (req: Request, res: Response) => {
    res.send('Start server')
})

start();
