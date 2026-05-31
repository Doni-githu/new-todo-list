import express from "express"
import mongoose from "mongoose"
import { config } from "dotenv"
import cors from "cors"
import TaskRoutes from "./routes/task.js"
config({
    quiet: true
})
const app = express()


app.use(cors())
app.use(express.json())
app.use(TaskRoutes)

const startApp = () => {
    app.listen(process.env.PORT, () => {
        console.log("Server started on http://localhost:3000")
        mongoose.connect(process.env.MONGODB_URI)
            .then(() => console.log("MongoDB connected"))
    })
}

startApp()