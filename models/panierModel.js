const mongoose = require('mongoose')
const Schema = mongoose.Schema

const panierSchema= new Schema({
    num_panier:{type: String, required: true, unique: true},
    quantite:{type: Number, required: true},
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    total_price:{type: Number, required: true},
    clientID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Add a client field

})


module.exports = mongoose.model('Panier', panierSchema)