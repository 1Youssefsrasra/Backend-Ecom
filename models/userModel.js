const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new Schema ({
    nom:{ type: String, required: true},
    prenom: { type: String, required: true},
    adresse: String, 
    email: { type: String, required: true, unique: true},
    telephone: { type: String, required: true},
    mdp: { type: String, required: true},
    role: { type: String, required: true, default:'client'},

}, {timestamps: true }) 

//static signup method
userSchema.statics.signup = async function(email, mdp, nom, telephone, adresse, prenom, role){

    //validation
    if(!email || !mdp) {
        throw Error('All fields must be filled')
    }

    if (!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(mdp)){
        throw Error('Password not strong enough')
    }


    //this=User
    const exists = await this.findOne({email})

    if(exists){
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(mdp, salt)

    const user = await this.create({nom, prenom, adresse, telephone, email, mdp: hash, role})

    return user

}

//static login method
userSchema.statics.login = async function(email, mdp) {
     //validation
     if(!email || !mdp) {
        throw Error('All fields must be filled')
    }
    const user = await this.findOne({email})

    if(!user){
        throw Error('Incorrect email')
    }
    const match = await bcrypt.compare(mdp, user.mdp)
    if(!match){
        throw Error('Incorrect password')
    }
    return user
}

module.exports= mongoose.model('User', userSchema)