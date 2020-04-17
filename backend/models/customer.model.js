const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const customerSchema = new Schema({
    UID: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    name: String,
    email: String,
    address: String,
    approved: Boolean
}, {
    timestamps: true
})

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;