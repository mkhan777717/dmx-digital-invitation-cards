
const user = require("../models/user.model")
const generateToken = require("../config/generateToken");

async function register(req,res) {

    try {
        const {userName, email, password} = req.body;

        console.log(userName)
        const User = await user.findOne({email: email})

        console.log(User)
        if (User) {
            return res.status(409).json({
                message: "User already exist",
            })
        };
    
    await user.create({
        userName: userName,
        email: email,
        password: password,
    })

    res.status(201).json({
        message: "User created successfully"
    })
    } catch (err) {
        console.log("Err:::",err)
        return res.status(500).json({
            message: "Internal Server Error."
        })
    }
    
};

async function login(req,res) {

    const userData = req.body;

    const User = await user.findOne(
    {email : userData.email});

    if (!User) {
        return res.status(404).json({
            message: "User not found"
        })
    };
    console.log(User)

    if (userData.password !== User.password) {
        return res.status(401).json({
            message: "Password is incorrect"
        })
    }

    let isProduction = false
    if (req.hostname !== "localhost") {
        isProduction = true
    } else {
        isProduction = false
    }

    const token = generateToken(User);

    res.status(200).cookie(
        "token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax"
        }
    ).json({
        message: "User logged in"
    })
};

async function logout(req, res) {
    const isProduction = req.hostname !== "localhost";

    res.clearCookie("token", {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax"
    });

    return res.status(200).json({
        message: "Logged out successfully"
    });
}

module.exports = {register,login,logout}