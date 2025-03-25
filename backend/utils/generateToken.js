const jwt = require("jsonwebtoken");

const generateToken = (userId, res) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables.");
  }

  // Generate a JWT with a 15-day expiration
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d", // Token expires in 15 days
  });

  // Set the JWT as an HTTP-only cookie
  res.cookie("jwt", token, {
    httpOnly: true, // Prevents JavaScript access (XSS protection)
    sameSite: "strict", // CSRF protection
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
  });
};

module.exports = generateToken;
