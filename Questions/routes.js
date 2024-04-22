import * as dao from "./dao.js";

export default function QuestionsRoutes(app) {
    // Fetch all questions
    const fetchAllQuestions = async (req, res) => {
        const questions = await dao.findAllQuestions();
        if (!questions) {
            res.status(404).send("No questions found");
        } else {
            res.json(questions);
        }
    };

    // create question
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

    // find questions by quiz id
    const findQuestionsForQuiz = async (req, res) => {
        const quizId = req.params.quizId;
        console.log("Requested Quiz ID:", quizId);
        try {
            const quiz = await dao.findQuizByQuizId(quizId);
            console.log("Quiz found:", quizId);
            if (!quiz) {
                console.log("No quiz found for Quiz ID:", quizId);
                return res.status(404).json({ message: 'Quiz not found' });
            }
            const questions = await dao.findQuestionsForQuiz(quiz.title);
            console.log("quiz title:", quiz.title);
            if (!questions || questions.length === 0) {
                console.log("No questions found for Quiz Title:", quiz.title);
                return res.status(404).json({ message: 'No questions found for this quiz' });
            }
            res.json(questions);
        } catch (error) {
            console.error('API Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };
    
    // Fetch a question by its ID
    const findQuestionById = async (req, res) => {
        const questionId = req.params.questionId;
        const question = await dao.findQuestionById(questionId);
        if (!question) {
            res.status(404).send("Question not found");
        } else {
            res.json(question);
        }
    };

    // update question
    const updateQuestion = async (req, res) => {
        const { questionId } = req.params;
        const question = req.body;
        try {
            const updatedQuestion = await dao.updateQuestion(questionId, question);
            res.json(updatedQuestion);
        } catch (err) {
            res.sendStatus(500);
        }
    };

    // delete question
    const deleteQuestion = async (req, res) => {
        const { questionId } = req.params;
        const status = await dao.deleteQuestion(questionId);
        res.json(status);
    };
    
    app.get("/api/questions", fetchAllQuestions);
    app.post("/api/quizzes/:quizId/questions", createQuestion);
    app.get("/api/questions/:questionId", findQuestionById);
    app.get("/api/quizzes/:quizId/questions", findQuestionsForQuiz);
    app.put("/api/questions/:questionId", updateQuestion);
    app.delete("/api/questions/:questionId", deleteQuestion);
}