import model from "./model.js";

export const createQuestion = (question) => {
    return model.create(question);
};

export const findAllQuestions = () => model.find();

export const findQuestionById = (questionId) =>
    model.findOne({ _id: questionId });

export const findQuestionsForQuiz = (quizId) => model.find({ quiz: quizId });

export const updateQuestion = (questionId, question) =>
    model.updateOne({ _id: questionId }, { $set: question });

export const deleteQuestion = (questionId) =>
    model.deleteOne({ _id: questionId });

export const addChoice = (questionId, choice) =>
    model.findById(questionId).then((question) => {
        question.choices.push(choice);
        return question.save();
});

export const deleteChoice = async (questionId, choiceId) => {
    model.findQuestionById(questionId).then((question) => {
        question.choices = question.choices.filter(
        (choice) => choice._id != choiceId
        );
        return question.save();
    });
};

export const getCorrectAnswerIndex = (questionId) =>
    model.findById(questionId).then((question) => {
        return question.getCorrectAnswerIndex();
});

export const checkAnswer = (questionId, answer) =>
    model.findById(questionId).then((question) => {
        return question.checkAnswer(answer);
});