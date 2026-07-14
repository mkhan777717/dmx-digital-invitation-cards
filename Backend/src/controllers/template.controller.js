const Templates = require("../models/templates.model");

async function getTemplates(req,res) {

    try {
        const templates = await Templates.find();

        return res.status(200).json({
            success : true,
            message: "Templates fetched successfully.",
            data: templates
        });

    } catch (err) {
        console.log("err:::", err)

        return res.status(500).json({
            success: false,
            message: "Internal server error."
        })
    }
};

async function getTemplatesbyId(req,res) {

    const id = req.params.id

    try {
        const template = await Templates.findOne({_id: id});

        if (!template) {
            return res.status(404).json({
                success: false,
                message: "Template not found."
            })
        }

        return res.status(200).json({
            success: true,
            message: "Template fetched successfully.",
            data: template
        })
    } catch(err) {
        console.log("err:::",err);

        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    };
};

module.exports = {getTemplates,getTemplatesbyId};