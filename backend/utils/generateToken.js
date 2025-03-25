const jwt = require("jsonwebtoken");

const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // ✅ 15 days in milliseconds
    httpOnly: true, // ✅ Prevents XSS attacks
    secure: process.env.NODE_ENV === "production", // ✅ Secure in production
    sameSite: "None", // ✅ Important for cross-origin cookies
  });
};

module.exports = generateToken;
