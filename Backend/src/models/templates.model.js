const mongoose = require("mongoose")

const templateSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    previewImage: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    templateCode: {
        type: String,
        required: true
    },

    fields: [
        {
            name: {
                type: String,
                required: true
            },

            label: {
                type: String,
                required: true
            },

            type: {
                type: String,
                enum: [
                    "text",
                    "textarea",
                    "number",
                    "date",
                    "time",
                    "image",
                    "music",
                    "url"
                ],
                required: true
            },

            required: {
                type: Boolean,
                default: false
            },

            placeholder: {
                type: String
            },

            order: {
                type: Number
            }
        }
    ]
},{
    timestamps: true
})

const templates = mongoose.model("Template",templateSchema);

module.exports = templates