const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Product=require('./productModel')

const womenSchema= new Schema({
    nomProd: {type: String, required: true}
}, {timestamps: true })

womenSchema.add(Product.schema)

module.exports=mongoose.model('Women', womenSchema)