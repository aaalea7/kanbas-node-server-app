import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, default: "" },
    points: { type: Number, default: 100 },
    dueDate: { type: Date, default: Date.now },
    availableUntilDate: { type: Date, default: Date.now },
    availableDate: { type: Date, default: Date.now },
    numberOfQuestions: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: false },
    quizType: {
        type: String,
        enum: [
            "Graded Quiz",
            "Practice Quiz",
            "Graded Survey",
            "Ungraded Survey",
        ],
        default: "Graded Quiz",
    },
    assignmentGroup: {
        type: String,
        default: "Quizzes",
        enum: ["Quizzes", "Exams", "Assignments", "Project"],
    },
    shuffleAnswers: { type: Boolean, default: true },
    timeLimit: { type: Boolean, default: true },
    timeLimitMinutes: { type: Number, default: 20 },
    multipleAttempts: { type: Boolean, default: false }, // If true, students can take the same quiz multiple times
    showCorrectAnswer: { type: Boolean, default: false }, // If true, students can see the correct answer after submitting the quiz
    accessCode: { type: String, default: "" },
    oneQuestionAtATime: { type: Boolean, default: true },
    webcameRequired: { type: Boolean, default: false },
    lockQuestionAfterAnswering: { type: Boolean, default: false },
    course: { type: String, required: true },
    // course: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Course",
    //     required: [true, "Please provide course"],
    // },
}, { collection: 'quizzes' });

export default quizSchema;