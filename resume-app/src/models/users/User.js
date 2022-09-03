import {Schema,model,models} from 'mongoose';

const UserSchema = new Schema({
   name: {
        type:String,
        required:true,
        trim:true
    },
    email: {
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true,
    versionKey:false
})

export default models.User || model("User",UserSchema)