import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
    // id: String,
    title: { type: String, required: true },
    start: String,
    due: String,
    points: Number,
    course: {
        type: String,
        required: true,
    },
    numberofQuestions: Number,
    isPublish: Boolean,

}, { collection: 'quizzes' });

export default quizSchema;