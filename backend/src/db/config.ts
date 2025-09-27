import mongoose from "mongoose"

export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL as string)
        console.log("MongoDB connected")
    }catch(err){
        console.error(err as Error)
        process.exit(1)
    }
}