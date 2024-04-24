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

export const updateQuestion = (questionId, question) => questionModel.updateOne({ _id: questionId }, { $set: question });
export const deleteQuestion = (questionId) => questionModel.deleteOne({ _id: questionId });









// export const addChoice = (questionId, choice) =>
//     questionModel.findById(questionId).then((question) => {
//         question.choices.push(choice);
//         return question.save();
// });

// export const deleteChoice = async (questionId, choiceId) => {
//     questionModel.findQuestionById(questionId).then((question) => {
//         question.choices = question.choices.filter(
//             (choice) => choice._id != choiceId
//         );
//         return question.save();
//     });
// };

// export const getCorrectAnswerIndex = (questionId) =>
//     questionModel.findById(questionId).then((question) => {
//         return question.getCorrectAnswerIndex();
// });

// export const checkAnswer = (questionId, answer) =>
//     questionModel.findById(questionId).then((question) => {
//         return question.checkAnswer(answer);
// });