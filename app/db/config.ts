import mongoose from 'mongoose'

export async function connectToMongoDB(){
    try{
        const MONGO_URI = process.env.MONGO_URI as string;
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB with Connection String: ", MONGO_URI);

    }catch(error){
        console.log("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}