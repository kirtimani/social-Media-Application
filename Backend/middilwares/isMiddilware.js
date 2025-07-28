import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;  // ✅ Correct way to get cookie

    if (!token) {
      return res.status(400).json({ message: "Token is not found" });
    }

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);  // ✅ No await needed
    req.userId = verifyToken.userId;  // ✅ Assign decoded userId

    next();  // ✅ Move to next middleware
  } catch (error) {
    return res.status(400).json({ message: `Auth error: ${error.message}` });
  }
};

export default isAuth;  // ✅ Correct export
