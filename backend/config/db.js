import mongoose from "mongoose";

export const connectDB = async () => {
    const MONGO_URI=process.env.MOGO_URI
    if (!MONGO_URI) {
        throw new Error("No MONGO_URI found in the environment file")
    }
    try {
        const conn =await mongoose.connect(MONGO_URI,{
            serverSelectionTimeoutMS:10000
        })

        console.log(`Connected to the mongo db successfully ${conn.connection.host}/${conn.connection.name}`)
        return conn;
    } catch (error) {
        console.log(`Error connecting to the mongo db ${error.message}`,error)
        process.exit(1)
    }
}