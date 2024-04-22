import * as dao from "./dao.js";

function QuizzesRoutes(app) {
    // find all quizzes
    app.get("/api/quizzes", async (req, res) => { // /api/courses/:cid/quizzes
        try {
            const quizzes = await dao.findAllQuizzes();
            if (!quizzes) {
                res.status(404).send("Quiz not found");
            } else {
                res.send(quizzes);
            }
        } catch (error) {
            console.error("Error fetching quiz:", error);
            res.status(500).send("Internal Server Error");
        }
    });

    // create quiz
    app.post("/api/courses/:cid/quizzes", async(req, res) => {
        const { cid } = req.params;
        try {
            const quizData = {
                ...req.body,
                course: cid,
                id: new Date().getTime().toString(),
            };
            const newQuiz = await dao.createQuiz(quizData);
            res.status(201).json(newQuiz);
            } catch (error) {
                console.error("Error creating quiz:", error);
                res.status(500).send("Internal Server Error");
            }
        });

    // find quizzes by course id
    // app.get("/api/courses/:cid/quizzes", async (req, res) => {
    //     const { cid } = req.params;
    //     const quizzes = await dao.findQuizzesByCourse(cid);
    //     res.json(quizzes);
    // });
    app.get('/api/courses/:cid/quizzes', async (req, res) => {
        const cid = req.params.cid;
        console.log("Requested Course ObjectId:", cid);
        try {
            const course = await dao.findCourseByCId(cid);
            if (!course) {
                console.log("No course found for ObjectId:", cid);
                return res.status(404).json({ message: 'Course not found' });
            }
            const quizzes = await dao.findQuizzesByCourse(course.id);
            if (!quizzes || quizzes.length === 0) {
                console.log("No quizzes found for Course ID:", course.id);
                return res.status(404).json({ message: 'No quizzes found for this course' });
            }
            res.json(quizzes);
        } catch (error) {
            console.error('API Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });
    
    // find quiz by id
    app.get("/api/quizzes/:quizId", async(req, res) => {
        const quizId = req.params.quizId;
        try {
            const quiz = await dao.findQuizById(quizId);
            if (!quiz) {
                res.status(404).send("Quiz not found");
            } else {
                res.send(quiz);
            }
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    });

    // update quiz
    app.put("/api/quizzes/:qid", async (req, res) => {
        const { qid } = req.params;
        try {
            const updatedQuiz = await dao.updateQuiz(qid, req.body);
            if (updatedQuiz.modifiedCount > 0) {
                res.json(await dao.findQuizById(id));
            } else {
                res.sendStatus(404);
            }
        } catch (error) {
            console.error("Error updating quiz:", error);
            res.status(500).send("Internal Server Error");
        }
    });

    // delete quiz
    app.delete("/api/quizzes/:qid", async (req, res) => {
        const { qid } = req.params;
        try {
            const result = await dao.deleteQuiz(qid);
            if (result.deletedCount > 0) {
                res.sendStatus(200);
            } else {
                res.sendStatus(404);
            }
        } catch (error) {
            console.error("Error deleting quiz:", error);
            res.status(500).send("Internal Server Error");
        }
    });
}

export default QuizzesRoutes;