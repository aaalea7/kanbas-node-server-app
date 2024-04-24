import quizModel from "./model.js";
import courseModel from '../Courses/model.js';
// import mongoose from "mongoose";

export const findAllQuizzes = () => quizModel.find();
export const createQuiz = (quiz) => { 
    // delete quiz._id;
    return quizModel.create(quiz);
};

export const updateQuiz = (quizId, quiz) => quizModel.updateOne({ _id: quizId }, { $set: quiz });
export const deleteQuiz = (quizId) => quizModel.deleteOne({ _id: quizId });

// export const findCourseByCId = async (cid) => {
//     const course = await courseModel.findById(cid);
//     return course;
// };

export const findQuizzesByCourse = (courseId) => quizModel.find({ course: courseId });

// export const findQuizById = (quizId) => { quizModel.findOne({ _id: quizId }) //.populate('course');
// };
export const findQuizById = (quizId) => quizModel.findById(quizId);