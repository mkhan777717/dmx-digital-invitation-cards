let express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");

// Invitation Routes.
router.post("/invitation",authMiddleware,);
router.get("/invitation",authMiddleware,);
router.get("/invitation/:id",authMiddleware,);
// router.put("/invitation/:id",authMiddleware,);
// router.delete("/invitation/:id",authMiddleware,);

module.exports = router