const mongoose = require('mongoose')
const Children= require('../models/childrenModel')


const getChildren = async (req, res) => {
    const  children= await Children.find({}).sort({createdAt: -1})

    res.status(200).json(children)
}

const getChild = async(req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such children product'})
    }

    const child = await Children.findById(id)

    if(!child){
        return res.status(404).json({error: 'no such children product'})
    }

    res.status(200).json(child)
}

const createChild = async(req, res) => {
    const {nomProd} = req.body

    //add document to database
    try {
        const child = await Children.create({nomProd})
        res.status(200).json(child)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const deleteChild = async (req, res) =>{
    const { id } = req.params

    //Check the id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such children product'})
    }

    const child = await Children.findOneAndDelete({_id: id})
    if(!child){
        return res.status(404).json({error: 'no such children product'})
    }

    res.status(200).json(child)
}

const updateChild= async (req, res) =>{
    const { id } = req.params

    //Check the id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such children product'})
    }

    const child = await Children.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if(!child){
        return res.status(404).json({error: 'no such children product'})
    }

    res.status(200).json(child)
}

module.exports={getChild, getChildren, createChild, updateChild, deleteChild}