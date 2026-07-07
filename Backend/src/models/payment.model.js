const mongooose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongooose.Schema.Types.ObjectId,
        ref: "Users"
    },

    invitationId: {
        type: mongooose.Schema.Types.ObjectId,
        ref: "Invitation"
    },

    amount: {
        type: Number,
        required: true
    },

    paymentGateway: {
        type: String,
        required: true
    },
    
    transactionId: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ["pending","completed","failed","refund"],
        default: "pending"
    },

    paidAt: {
        type: String,
        required: true
    }
},{
   timeStamps: true 
});

const payments = mongooose.model("Payments",paymentSchema);

module.exports = payments