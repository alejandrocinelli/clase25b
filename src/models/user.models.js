import {Schema, model} from 'mongoose';

const userSchema = Schema({
    username: {type : String},
    password: {type : String},
    email: {type : String},
    name : {type : String},
    lastname : {type : String},
    phono : {type : String},
})

export const User = model("user", userSchema);