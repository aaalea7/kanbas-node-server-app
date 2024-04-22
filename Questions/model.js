import mongoose from "mongoose";
import questionSchema from "./schema.js";

const questionModel = mongoose.model("Question", questionSchema);


export default questionModel;