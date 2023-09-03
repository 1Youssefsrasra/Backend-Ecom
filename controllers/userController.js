const mongoose = require('mongoose')
const User = require('../models/userModel')
const jwt = require ('jsonwebtoken')

const getUsers = async (req, res) => {
    const users = await User.find({}).sort({createdAt: -1})

    res.status(200).json(users)
}

const getUser = async(req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such user'})
    }

    const user = await User.findById(id)

    if(!user){
        return res.status(404).json({error: 'no such user'})
    }

    res.status(200).json(user)
}

const createUser = async(req, res) => {
    const {nom, prenom, adresse, email, telephone, mdp,role} = req.body

    //add document to database
    try {
        const user = await User.create({nom, prenom, adresse, email, telephone, mdp,role})
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const deleteUser = async (req, res) =>{
    const { id } = req.params

    //Check the id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such user'})
    }

    const user = await User.findOneAndDelete({_id: id})
    if(!user){
        return res.status(404).json({error: 'no such user'})
    }

    res.status(200).json(user)
}

const updateUser = async (req, res) =>{
    const { id } = req.params

    //Check the id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such user'})
    }

    const user = await User.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if(!user){
        return res.status(404).json({error: 'no such user'})
    }

    res.status(200).json(user)
}



const createToken = (_id) => {
    return jwt.sign({_id: _id}, process.env.SECRET, {expiresIn: '2d'})
}

//login user
 const loginUser = async (req, res) =>{

    const {email, mdp} = req.body
    try{
        const user = await User.login(email, mdp)

        //create token
        const token = createToken(user._id)
        
        res.status(200).json({email, role: user.role ,token})
    } catch (error){
         res.status(500).json({error: error.message})
    }

 }


//signup user
const signupUser = async (req, res) =>{
    const {email, mdp, nom, telephone, adresse, prenom, role} = req.body

    try{
        const user = await User.signup(email, mdp, nom, telephone, adresse, prenom, role)

        //create token
        const token = createToken(user._id)

        res.status(200).json({email,role, token})

    } catch (error){
         res.status(500).json({error: error.message})
    }

 }



module.exports={loginUser, signupUser, getUsers, getUser, createUser, deleteUser, updateUser}