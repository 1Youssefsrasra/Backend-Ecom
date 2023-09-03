const mongoose = require('mongoose')
const Panier= require('../models/panierModel')

const getPaniers = async (req, res) => {
    const clientID = req.user._id;

    const paniers = await Panier.find({clientID}).sort({createdAt: -1})

    res.status(200).json(paniers)
}

const getPanier = async(req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such cart'})
    }

    const panier = await Panier.findById(id)

    if(!panier){
        return res.status(404).json({error: 'no such cart'})
    }

    res.status(200).json(panier)
}

const createPanier = async(req, res) => {
    const {num_panier,quantite, products, total_price} = req.body
    const clientID = req.user._id;

    //add document to database
    try {
        const panier = await Panier.create({num_panier,quantite, products, total_price, clientID})
        res.status(200).json(panier)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const deletePanier = async (req, res) =>{
    const { id } = req.params

    //Check the id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such cart'})
    }

    const panier = await Panier.findOneAndDelete({_id: id})
    if(!panier){
        return res.status(404).json({error: 'no such cart'})
    }

    res.status(200).json(panier)
}

const updatePanier = async (req, res) =>{
    const { id } = req.params

    //Check the id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such cart'})
    }

    const panier = await Panier.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if(!panier){
        return res.status(404).json({error: 'no such cart'})
    }

    res.status(200).json(panier)
}

module.exports={getPaniers, getPanier, deletePanier, updatePanier, createPanier}