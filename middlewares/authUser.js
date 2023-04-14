import jwt from "jsonwebtoken";
import User from "../models/User.js";

 const authUser = async (req, res, next) => {
  try {
    const userToken = req.header("Authorization").replace("Bearer ", "");
    const decodeToken = jwt.verify(userToken, "blogSecret");

    const user = await User.findOne({ _id: decodeToken._id });
    if (!user) return res.status(404).send("Please authenticate");
    else {
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
export default authUser;