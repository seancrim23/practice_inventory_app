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
    floor: {
        type: Number,
        required: true
    },
    aisle: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    dateAdded: {
        type: Date,
        required: true,
        default: new Date()
    }
});

const itemModel = mongoose.model('Item', itemSchema);

module.exports = itemModel;