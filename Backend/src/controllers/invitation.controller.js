const Invitation = require("../models/invitation.model");
const Template = require("../models/templates.model")

async function createInvitation(req,res) {

    const data = req.body;

    try{
        
        const template = await Template.findById(data.templateId);

        if (!template) {
            return res.status(404).json({
                success: false,
                message: "Template not found."
            })
        };

        for (const field of template.fields) {

            if (field.required && !data.eventDetails[field.name]) {

                return res.status(400).json({
                    success: false,
                    message: `${field.label} is required`
                });

            }
        };

        const invitation = await Invitation.create({
            userId: req.user._id,
            templateId: data.templateId,
            eventdetails: data.eventdetails,
            images: data.images,
            music: data.music
        });

        return res.status(201).json({
            success: true,
            message: "Invitation created successfully.",
            data: invitation
        })

    } catch (err) {
        console.log("err:::",err)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error."
        })
    }
};

async function getInvitations(req,res) {
    
    try{
        const invitations = await Invitation.find({
            userId: req.user._id
        });

        return res.status(200).json({
            success: true,
            message: "Invitations fetched successfully.",
            data: invitation
        })
    } catch(err) {

        console.log("err:::",err)
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        })
    }
};
        next();
module.exports = {createInvitation};