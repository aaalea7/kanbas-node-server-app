import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
    {
        text: { type: String },
        isCorrect: { type: Boolean, default: false },
        question: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question",
            required: [true, "Please provide question"],
        },
    },
    { collection: "answers" }
);

export default answerSchema;