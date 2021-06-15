import mongoose from 'mongoose'

const EventSchema= mongoose.Schema(
    {
    
        name:{
            type: String,
            required: true,
        },
        room:{
            type: String,
            required: true,
           unique:true
        },
        description:{
            type: String,
            required: true,
        },
        dateState:{
            type: Date,
            required: true,
        },
        slot:
        {
            type: String,
            required: true, 
        }
        },

        {
            timestamps:true
        })


const EventMeet = mongoose.model('EventMeet',EventSchema)

export default EventMeet;