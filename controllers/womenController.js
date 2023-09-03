const mongoose = require('mongoose')
const Women= require('../models/womenModel')


const getWomen = async (req, res) => {
    const  women= await Women.find({}).sort({createdAt: -1})

    res.status(200).json(women)
}

const getWoman = async(req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such women product'})
    }

    const women = await Women.findById(id)

    if(!women){
        return res.status(404).json({error: 'no such women product'})
    }

    res.status(200).json(women)
}

const createWoman = async(req, res) => {
    const {nomProd} = req.body

    //add document to database
    try {
        const women = await Women.create({nomProd})
        res.status(200).json(women)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const deleteWoman = async (req, res) =>{
    const { id } = req.params

    //Check the id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such women product'})
    }

    const women = await Women.findOneAndDelete({_id: id})
    if(!women){
        return res.status(404).json({error: 'no such women product'})
    }

    res.status(200).json(women)
}

const updateWoman= async (req, res) =>{
    const { id } = req.params

    //Check the id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such women product'})
    }

    const women = await Women.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if(!women){
        return res.status(404).json({error: 'no such women product'})
    }

    res.status(200).json(women)
}

module.exports={getWoman, getWomen, createWoman, updateWoman, deleteWoman}