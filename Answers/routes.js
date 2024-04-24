import * as dao from "./dao.js";

const fetchAllAnswers = async (req, res) => {
try {
    let answers = await dao.findAllAnswers();
    if (!answers) {
            throw new Error("No answer found");
    } else {
        return res.json([]) || res.status(200).json(answers);
    }
    
    } catch (e) {
        console.log(`Error: ${e.message}`);
        res.status(400).send(e.message);
    }
};

const findAnswersForQuestion = async (req, res) => {
    const { questionId } = req.params;
    // console.log("Requested Question ID:", questionId);
    const answers = await dao.findAnswersForQuestion(questionId);
    if (!answers) {
        res.status(404).send("No answers found");
        return res.json([]);
    } else {
        res.json(answers);
    }
};

const createAnswer = async (req, res) => {
    const { questionId } = req.params;
    const answerData = req.body;
    try {
        answerData.question = questionId;
        const answer = await dao.createAnswer(answerData);
        res.json(answer);
    } catch (err) {
        console.log(err.message);
        res.sendStatus(500);
    }
};

const updateAnswer = async (req, res) => {
    const { answerId } = req.params;
    const answer = req.body;
    try {
        const updatedAnswer = await dao.updateAnswer(answerId, answer);
        res.json(updatedAnswer);
    } catch (err) {
        // console.log(err.message);
        res.sendStatus(500);
    }
};
const updateAnswers = async (req, res) => {
    try {
        let answers = await dao.findAllAnswers();
        const updatedAnswers = await dao.updateAnswers(answers);
        res.json(updatedAnswers);
    } catch (error) {
        console.error('Failed to update answers:', error);
        res.sendStatus(500);
    }
};

const deleteAnswer = async (req, res) => {
    const { answerId } = req.params;
    const status = await dao.deleteAnswer(answerId);
    res.json(status);
};

const deleteAllAnswers = async (req, res) => {
    try {
        const result = await dao.deleteAllAnswers();
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "No answers found to delete" });
        }
        res.status(200).json({ message: "All answers deleted successfully", details: result });
    } catch (error) {
        console.error("Failed to delete answers:", error);
        res.status(500).send("Failed to delete answers.");
    }
};

export default function AnswersRoutes(app) {
    app.get("/api/answers", fetchAllAnswers);
    app.get("/api/questions/:questionId/answers", findAnswersForQuestion);
    app.post("/api/questions/:questionId/answers", createAnswer);
    app.put("/api/answers/:answerId", updateAnswer);
    app.put("/api/answers", updateAnswers);
    app.delete("/api/answers/:answerId", deleteAnswer);
    app.delete("/api/answers", deleteAllAnswers);
}



