const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    size:{
        type: String,
        required: true
    },
 
    
    category: { type: String},
    total_sales: { type: Number, default: 0 }
}, {timestamps: true }) 

// Create a virtual field 'id' that is an alias for '_id'
productSchema.virtual('id').get(function () {
    return this._id.toHexString();
  });
  
  // Ensure virtual fields are included when converting document to JSON
  productSchema.set('toJSON', { virtuals: true });
  

//create a model
module.exports = mongoose.model('Product', productSchema) 
