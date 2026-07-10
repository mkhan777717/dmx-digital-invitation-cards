const jwt = require("jsonwebtoken");

function generateToken(user) {
    return jwt.sign({
        _id: user._id,
        userName: user.userName,
        email: user.email
    },
    process.env.JWT_SECRET,
    { expiresIn : "1h"}
)
};

module.exports = generateToken