import mongoose from "mongoose";
import answerSchema from "./schema.js";

const answerModel = mongoose.model("AnswerModel", answerSchema);


export default answerModel;