import questionModel from "./model.js";
import quizModel from "../Quizzes/model.js";

export const createQuestion = (question) => {
    delete question._id;
    return questionModel.create(question);
};

export const findAllQuestions = () => questionModel.find();

// export const findQuestionById = (questionId) => questionModel.findOne({ _id: questionId });
export const findQuestionById = (questionId) => questionModel.findById(questionId);

// export const findQuestionsForQuiz = (quizId) => quizModel.findById(quizId);

export const findQuestionsForQuiz = (quizId) => questionModel.find({ quiz: quizId });

export const updateQuestion = (questionId, question, questionType) => questionModel.updateOne({ _id: questionId }, { $set: question }, { $set: questionType });
export const deleteQuestion = (questionId) => questionModel.deleteOne({ _id: questionId });

export const showQuestionType = (questionId) => questionModel.findById(questionId, 'type');
export const updateQuestionType = (questionId, type) => questionModel.updateOne({ _id: questionId }, { $set: { type: type } });
