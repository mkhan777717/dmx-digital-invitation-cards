const mongooose = require("mongoose");

const invitationSchema = new mongooose.Schema({
    userId: {
        type: mongooose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }, 

    templateId : {
        Type: mongooose.Schema.Types.ObjectId,
        ref: "Template",
        required: true
    },

    occasion: {
        Type: String,
        required: true
    },

    eventdetails: {
       type: mongooose.Schema.Types.Mixed,
    },

    images:[
        {
            url: String,
            publicId: String
        }
    ],

    music: {
        url: String,
        publicId: String,
        title: String
    },

},{
    timestamps: true
})

const invitation = mongooose.model("Invitation",invitationSchema)

module.exports = invitation