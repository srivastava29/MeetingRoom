//Common JS module use require
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import morgan from 'morgan'

dotenv.config();

connectDB();

const app=express()

if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}

app.use(express.json())

app.get('/',(req,res)=>
{
    res.send("API is running.....");
})



app.use('/api/users',userRoutes)   
  

const PORT=process.env.PORT || 5000

app.listen(PORT,console.log(`Server running on ${process.env.NODE_ENV} mode on port ${PORT}`))

