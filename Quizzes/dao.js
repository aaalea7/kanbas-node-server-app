import quizModel from "./model.js";
import courseModel from '../Courses/model.js';
// import mongoose from "mongoose";

export const findAllQuizzes = () => quizModel.find();
export const createQuiz = (quiz) => { 
    delete quiz._id;
    return quizModel.create(quiz); 
};

export const updateQuiz = (id, quiz) => quizModel.updateOne({ _id: id }, { $set: quiz });
export const deleteQuiz = (id) => quizModel.deleteOne({ _id: id });

export const findCourseByCId = async (cid) => {
    const course = await courseModel.findById(cid);
    return course;
};

export const findQuizzesByCourse = async (id) => {
    const quizzes = await quizModel.find({ course: id });
    return quizzes;
};

export const findQuizById = async (id) => {
    const quiz = await quizModel.findById(id);
    return quiz;
};
