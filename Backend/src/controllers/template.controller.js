const Templates = require("../models/templates.model");

async function getTemplates(req,res) {

    try {
        const templates = await Templates.find();

        return res.status(200).json({
            success = true,
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

    try {
        const template = 
    } catch(err) {

    }
}
module.exports = {getTemplates}