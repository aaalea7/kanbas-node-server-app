import Mongoose from "mongoose";
import userSchema from "./schema.js";

const userModel = Mongoose.model("Users", userSchema);

export default userModel;