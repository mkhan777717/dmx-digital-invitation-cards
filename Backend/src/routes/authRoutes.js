const express = require("express");
const {register,login,logout} = require("../controllers/auth.controller")
const router = express.Router()

// login routes
router.post("/login", login)
router.post("/logout",logout)

// register route
router.post("/register",register)

module.exports = router;


// occasion model - id name category,
// template model - id title , ocassion id , price, thumbnail,
// invitation model - event date time venue location 
// rsvp model - attendance count, response , invitation id and guest_id,
// guest model - full name, phone num, invitation id, 
// payments model - user id invitation id, amount, payment id, status
