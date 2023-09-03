const mongoose = require('mongoose')
const Admin= require('../models/adminModel')

const getAdmins = async (req, res) => {
    const  admins= await Admin.find({}).sort({createdAt: -1})

    res.status(200).json(admins)
}

const getAdmin = async(req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such admin'})
    }

    const admin = await Admin.findById(id)

    if(!admin){
        return res.status(404).json({error: 'no such admin'})
    }

    res.status(200).json(admin)
}

const createAdmin = async(req, res) => {
    const {nom, prenom, adresse, email, telephone, mdp,role } = req.body

    //add document to database
    try {
        const admin = await Admin.create({nom, prenom, adresse, email, telephone, mdp, role})
        res.status(200).json(admin)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const deleteAdmin = async (req, res) =>{
    const { id } = req.params

    //Check the id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such admin'})
    }

    const admin = await Admin.findOneAndDelete({_id: id})
    if(!admin){
        return res.status(404).json({error: 'no such admin'})
    }

    res.status(200).json(admin)
}

const updateAdmin = async (req, res) =>{
    const { id } = req.params

    //Check the id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such admin'})
    }

    const admin = await Admin.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if(!admin){
        return res.status(404).json({error: 'no such admin'})
    }

    res.status(200).json(admin)
}

module.exports = {getAdmins, getAdmin, createAdmin, deleteAdmin, updateAdmin}