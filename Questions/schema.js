import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        points: { type: Number, default: 1, required: true },
        questionText: { type: String, default: "" },
        type: { 
            type: String, 
            enum: ["MULTIPLE_CHOICE", "TRUE_FALSE", "FILLIN_THE_BLANK"],
            default: "MULTIPLE_CHOICE",
            required: true,
        },
        quiz: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Quiz",
            required: [true, "Please provide quiz"],
        },
    }, { collection: "questions" }
);

export default questionSchema;