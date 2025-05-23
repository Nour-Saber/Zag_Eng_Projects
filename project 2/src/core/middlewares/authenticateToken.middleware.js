import { User } from "../../api/models/users/user.model.js";
import { UnAuthorizedError } from "../errors/Errors.js";
import { verifyToken } from "../services/jwt.services.js";


export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new UnAuthorizedError("Token Not provided");
    }

    const decodedToken = verifyToken(token);

    const user = await User.findById(decodedToken._id);

    if (!user) {
      throw new UnAuthorizedError("Invalid or expired Token");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};