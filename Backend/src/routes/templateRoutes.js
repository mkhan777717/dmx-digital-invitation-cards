const express = require("express")
const {getTemplates,getTemplatesbyId} = require("../controllers/template.controller")
const router = express.Router()

// To fetch templates.
router.get("/templates",getTemplates);
router.get("template/:id",getTemplatesbyId);

module.exports = router;