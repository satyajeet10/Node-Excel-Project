const mongoose = require('../db/mongoose')

const bankSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true,
        default: false
    },
    bank_name: {
        type: String,
        required: true,
        default: false
    }
})

const Bank = mongoose.model('banks_list', bank)
module.exports = Bank