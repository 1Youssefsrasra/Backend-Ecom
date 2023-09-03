const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Product=require('./productModel')

const menSchema= new Schema({
    nomProd: {type: String, required: true}
}, {timestamps: true })

menSchema.add(Product.schema)

module.exports=mongoose.model('Men', menSchema)