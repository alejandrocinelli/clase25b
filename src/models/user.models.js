import {Schema, model} from 'mongoose';

const userSchema = Schema({
    username: {type : String},
    password: {type : String},
    email: {type : String},
})

export const User = model("user", userSchema);