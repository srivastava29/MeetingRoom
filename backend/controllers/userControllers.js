import asyncHandler from 'express-async-handler'
import UserMeet from '../models/UserModel.js'
import EventMeet from '../models/EventModel.js'
import generateToken from '../utils/generateToken.js'


const authUser = asyncHandler(async(req,res)=>
{
    const {email,password} = req.body

    const user = await UserMeet.findOne({email:email}) //find user with the entered email

    if(user && (await user.matchPassword(password)))
    {
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin: user.isAdmin,
            token:generateToken(user._id)
        })
    }

    else
    {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})


const registerUser = asyncHandler(async(req,res)=>
{
    const {team_name,email,password} = req.body
    console.log(team_name)
    const userExists = await UserMeet.findOne({email:email}) //find user with the entered email
    console.log(userExists)
    if(userExists)
    {
        res.status(400)
        throw new Error('User already Exists')
    }
    
        const user = await UserMeet.create({
            team_name,
            email,
            password
        })

        if(user)
        {
            res.status(201)
            res.json({
                _id:user._id,
                team_name:user.team_name,
                email:user.email,
                token:generateToken(user._id)
            })

        }
        else
        {
            res.status(400)
            throw new Error('Invalid User Data')
        }
})

const saveEvent = asyncHandler(async(req,res)=>
{
    const {room,name,description,dateState,slot} = req.body
    c
        const event = await EventMeet.create({
            room,
            name,
            description,
            dateState,
            slot
        })

        if(event)
        {
            res.status(201)
            res.json({
                _id:event._id,
                name:event.team,
                room:event.room,
                description:event.description,
                dateState:event.dateState,
                slot:event.slot
                
            })

        }
        else
        {
            res.status(400)
            throw new Error('Invalid Event Data')
        }
})



export 
{
    authUser, 
    registerUser,
    saveEvent
}