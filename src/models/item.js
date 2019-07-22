const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    stock: {
        type: Number,
        min: 0,
        default: 0
    },
    location: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        min: 0,
        required: true
    }
});

const itemModel = mongoose.model('Item', itemSchema);

module.exports = itemModel;