import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
    id: String,
    title: { type: String, required: true },
    course: {
        type: String,
        required: true,
    },
    start: String,
    due: String,
    points: Number
}, { collection: 'assignments' });

export default assignmentSchema;