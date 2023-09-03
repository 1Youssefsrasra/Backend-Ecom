const mongoose = require('mongoose')
const Men= require('../models/menModel')

const getMen = async (req, res) => {
    const  men= await Men.find({}).sort({createdAt: -1})

    res.status(200).json(men)
}

const getMan = async(req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such men product'})
    }

    const men = await Men.findById(id)

    if(!men){
        return res.status(404).json({error: 'no such men product'})
    }

    res.status(200).json(men)
}

const createMan = async(req, res) => {
    const {nomProd} = req.body

    //add document to database
    try {
        const men = await Men.create({nomProd})
        res.status(200).json(men)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const deleteMan = async (req, res) =>{
    const { id } = req.params

    //Check the id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such men product'})
    }

    const men = await Men.findOneAndDelete({_id: id})
    if(!men){
        return res.status(404).json({error: 'no such men product'})
    }

    res.status(200).json(men)
}

const updateMan= async (req, res) =>{
    const { id } = req.params

    //Check the id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such men product'})
    }

    const men = await Men.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if(!men){
        return res.status(404).json({error: 'no such men product'})
    }

    res.status(200).json(men)
}

module.exports={getMan, getMen, createMan, updateMan, deleteMan}