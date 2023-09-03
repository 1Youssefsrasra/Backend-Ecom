const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commandSchema= new Schema({
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    dateCom:{type: Date, required: true},
    quantity:{type: Number, required: true},
    price:{type: Number},
    status:{type:String, default: "In progress"},
    user_id: {type: String}
})

module.exports=mongoose.model('Command', commandSchema)