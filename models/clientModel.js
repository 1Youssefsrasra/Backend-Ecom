const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User= require('./userModel')

const clientSchema= new Schema({
    num_panier: { type: Number, ref: 'Panier' },
    total_orders: { type: Number, default: 0 }
}, {timestamps: true })

//heritage
clientSchema.add(User.schema)

module.exports= mongoose.model('Client', clientSchema)