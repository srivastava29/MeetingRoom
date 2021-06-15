import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const UserSchema= mongoose.Schema(
    {
    
        team_name:{
            type: String,
            required: true,
        },
        email:{
            type: String,
            required: true,
           unique:true
        },
        password:{
            type: String,
            required: true,
        }
        },

        {
            timestamps:true
        })


UserSchema.methods.matchPassword = async function(enteredPassword)
{
    return await bcrypt.compare(enteredPassword,this.password)
}

UserSchema.pre('save',async function(next) //run pre save
{
    if(!this.isModified('password'))
    {
        next()
    }
    

    const salt = await bcrypt.genSalt(10)

    this.password = await bcrypt.hash(this.password,salt)
})

const UserMeet = mongoose.model('UserMeet',UserSchema)

export default UserMeet;