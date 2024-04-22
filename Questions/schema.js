import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        points: { type: Number, default: 1, required: true },
        questionText: { type: String, default: "" },
        quiz: {
            // type: mongoose.Schema.Types.ObjectId,
            type: String,
            required: true,
            // ref: "Quiz",
            // required: [true, "Please provide quiz"],
        },
    }, { collection: "questions" }
);

export default questionSchema;