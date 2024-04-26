import answerModel from "./model.js";
import questionModel from "../Questions/model.js";

export const findAllAnswers = () => answerModel.find();

export const createAnswer = (answer) => {
    delete answer._id;
    return answerModel.create(answer);
};

// export const findAnswersForQuestion = (questionId) => answerModel.find({ question: questionId });
// export const findAnswersForQuestion = (questionId) => answerModel.findById(questionId);

export const updateAnswer = (answerId, answer) => {
    return answerModel.findOneAndUpdate(
        { _id: answerId },
        { $set: answer },
        { new: true, runValidators: true }
    );
};

export const deleteAnswer = (answerId) => answerModel.deleteOne({ _id: answerId });

// export const deleteAllAnswers = () => answerModel.deleteMany({});
export const deleteAllAnswers = () => {
    console.log("Deleting all answers from the database");
    return answerModel.deleteMany({});
};

export const findAnswersForQuestion = (questionId, type) => {
    const query = { question: questionId };
    if (type) {
        query.type = type;
    }
    return answerModel.find(query);
};
