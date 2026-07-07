const mongoose = require("mongoose")

const templateSchema = new mongoose.Schema({
    title: {
        Type: String,
        required: true
    },

    category: {
        Type: String,
        required: true
    },

    previewImage: {
        Type: String,
        required: true
    },

    price: {
        Type: String,
        required: true
    },

    templateCode: {
        Type: String,
        required: true
    }
},{
    timestamps: true
})

const templates = mongoose.model("templates",templateSchema);

module.exports = templates