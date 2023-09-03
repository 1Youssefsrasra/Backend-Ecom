const mongoose = require('mongoose')
const Client=require('../models/clientModel')

const getClients = async (req, res) => {
    const  clients= await Client.find({}).sort({createdAt: -1})

    res.status(200).json(clients)
}

const getClient = async(req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such client'})
    }

    const client = await Client.findById(id)

    if(!client){
        return res.status(404).json({error: 'no such client'})
    }

    res.status(200).json(client)
}

const createClient = async(req, res) => {
    const {nom, prenom, adresse, email, telephone, mdp, role, num_panier,total_orders} = req.body

    //add document to database
    try {
        const client = await Client.create({nom, prenom, adresse, email, telephone, mdp, role,num_panier,total_orders})
        res.status(200).json(client)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const deleteClient = async (req, res) =>{
    const { id } = req.params

    //Check the id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such client'})
    }

    const client = await Client.findOneAndDelete({_id: id})
    if(!client){
        return res.status(404).json({error: 'no such client'})
    }

    res.status(200).json(client)
}

const updateClient = async (req, res) =>{
    const { id } = req.params

    //Check the id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such client'})
    }

    const client = await Client.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if(!client){
        return res.status(404).json({error: 'no such client'})
    }

    res.status(200).json(client)
}

module.exports={getClients, getClient, createClient, deleteClient, updateClient}