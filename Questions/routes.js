import * as dao from "./dao.js";

export default function QuestionsRoutes(app) {
    const fetchAllQuestions = async (req, res) => {
        const questions = await dao.findAllQuestions();
        if (!questions) {
            res.status(404).send("No questions found");
        } else {
            res.json(questions);
        }
    };
    const findQuestionById = async (req, res) => {
        const question = await dao.findQuestionById(req.params);
        if (!question) {
            res.status(404).send("Question not found");
        } else {
            res.json(question);
        }
    };

    const findQuestionsForQuiz = async (req, res) => {
        const { quizId } = req.params;
        const questions = await dao.findQuestionsForQuiz(quizId);
        if (!questions) {
            res.status(404).send("No questions found");
        } else {
            res.json(questions);
        }
    };

    const createQuestion = async (req, res) => {
        const { quizId } = req.params;
        const questionData = req.body;
        try {
            questionData.quiz = quizId;
            const question = await dao.createQuestion(questionData);
            res.json(question);
        } catch (err) {
            console.log(err.message);
            res.sendStatus(500);
        }
    };

    const updateQuestion = async (req, res) => {
        const { qid } = req.params;
        const question = req.body;
        try {
            const updatedQuestion = await dao.updateQuestion(qid, question);
            res.json(updatedQuestion);
        } catch (err) {
            res.sendStatus(500);
        }
    };

    const deleteQuestion = async (req, res) => {
        const { qid } = req.params;
        const status = await dao.deleteQuestion(qid);
        res.json(status);
    };
    
    app.post("/api/quizzes/:quizId/questions", createQuestion);
    app.get("/api/questions", fetchAllQuestions);
    app.get("/api/questions/:id", findQuestionById);
    app.get("/api/quizzes/:quizId/questions", findQuestionsForQuiz);
    app.put("/api/questions/:qid", updateQuestion);
    app.delete("/api/questions/:qid", deleteQuestion);
}