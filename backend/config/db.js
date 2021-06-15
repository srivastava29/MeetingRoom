import mongoose from 'mongoose';
import dotenv from 'dotenv'
const connectDB=async ()=>
{

    try{
    const conn= await mongoose.connect(process.env.MONGO_URI, {
        useUnifiedTopology:true,
        useNewUrlParser:true
    })
    console.log(`MongoDB Connected ${conn.connection.host}`)
}catch(error){
    console.log(`Error:${error}`);
    process.exit(1);
}
}

export default connectDB;