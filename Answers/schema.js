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
        // type: {
        //     type: String,
        //     enum: ["MULTIPLE_CHOICE", "TRUE_FALSE", "FILLIN_THE_BLANK"],
        //     required: true
        // },
        type: {
            type: String,
            ref: "Question.type",
            required: true
        },
    },
    { collection: "answers" }
);

export default answerSchema;