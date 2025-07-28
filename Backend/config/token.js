import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const genToken = (userId) => {
  try {
    const token = jwt.sign(
      { userId },
      process.env.jwt_SECRET,
      { expiresIn: "10y" }
    );
    return token;
  } catch (error) {
    throw new Error(`Token generation error: ${error.message}`);
  }
};

export default genToken;
