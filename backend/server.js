import "dotenv/config"
import express from 'express';
import cors from "cors"
import morgan from "morgan";

import {connectDB} from './config/db.js'
import {notFound, errorHandler} from "./middleware/error.middleware.js"
import authRoutes from './routes/auth.route.js'
import leadRoutes from './routes/lead.routes.js'
import contactRoutes from './routes/contact.route.js'

const app = express()

// middleware layer
app.use(
    cors({
        origin:process.env.CLIENT_URL || "http://localhost:5173",
        credentials:true
    })
)
app.use(express.json({limit:"1mb"}))
app.use(express.urlencoded({extended:true}))
if(process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"))
}

// Routes

app.get("/health",(req,res)=>{
    res.json({success:true, status:"ok", service:"CRM api"})
})

app.use("/api/auth",authRoutes)
app.use("/api/lead",leadRoutes)
app.use("/api/contact",contactRoutes)

// error handling
app.use(notFound)
app.use(errorHandler)

// boot
const PORT = process.env.PORT || 8100

const start  = async () => {
    try {
        await connectDB()
        app.listen(PORT,()=>{
            console.log(`TTP CRM API running on http://localhost:${PORT}`)
        })
    } catch (error) {
        console.error("❌ Failed to start server:",error.message)
        process.exit(1)
    }
}

start()

export default app