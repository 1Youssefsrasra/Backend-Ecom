const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Product=require('./productModel')

const childrenSchema= new Schema({
    nomProd: {type: String, required: true}
}, {timestamps: true })

childrenSchema.add(Product.schema)

module.exports=mongoose.model('Children', childrenSchema)