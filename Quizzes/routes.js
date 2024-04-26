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
    // app.post("/api/courses/:courseId/quizzes", async(req, res) => {
    //     const courseId = req.params.courseId;
    //     try {
    //         const quizData = {
    //             ...req.body,
    //             course: cid,
    //             id: new Date().getTime().toString(),
    //         };
    //         quizData.course = courseId;
    //         const newQuiz = await dao.createQuiz(quizData);
    //         res.status(201).json(newQuiz);
    //     } catch (error) {
    //         console.error("Error creating quiz:", error);
    //         res.status(500).send("Internal Server Error");
    //     }
    // });

    // create quiz
    app.post("/api/courses/:courseId/quizzes", async(req, res) => {
        const { courseId } = req.params;
        const quizData = req.body;
        try {
            quizData.course = courseId;
            const quiz = await dao.createQuiz(quizData);
            res.json(quiz);
        } catch (err) {
            console.log(err.message);
            res.sendStatus(500);
        }
    });

    // find quizzes by course
    app.get('/api/courses/:courseId/quizzes', async (req, res) => {
        const { courseId } = req.params;
        // console.log("Requested Course Id:", courseId);
        try {
            // const course = await dao.findCourseByCId(cid);
            // if (!course) {
            //     console.log("No course found for ObjectId:", cid);
            //     return res.status(404).json({ message: 'Course not found' });
            // }
            const quizzes = await dao.findQuizzesByCourse(courseId);
            if (!quizzes || quizzes.length === 0) {
                // console.log("No quizzes found for Course ID:", courseId);
                return res.json([])
                // res.status(404).json({ message: 'No quizzes found for this course' });
            } else { res.json(quizzes); }
        } catch (error) {
            console.error('API Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });
    // app.get("/api/courses/:courseId/quizzes", async (req, res) => {
    //     const courseId = req.params.courseId;
    //     const quizzes = await dao.findQuizzesByCourse(courseId);
    //     console.log("Course ID received:", courseId);
    //     if (!quizzes) {
    //         res.status(404).send("No quizzes found");
    //     } else {
    //         res.json(quizzes);
    //     }
    // });
    
    // find quiz by id
    app.get("/api/quizzes/:quizId", async(req, res) => {
        const { quizId } = req.params;
        try {
            const quiz = await dao.findQuizById(quizId);
            // console.log("Quiz ID received:", quizId);
            if (!quiz) {
                res.status(404).send("Quiz not found");
            } else {
                res.json(quiz);
            }
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    });

    // update quiz
    app.put("/api/quizzes/:quizId", async (req, res) => {
        const { quizId } = req.params;
        try {
            const updatedQuiz = await dao.updateQuiz(quizId, req.body);
            if (!updatedQuiz) {
                res.status(404).send("No quiz found with given ID");
            } else {
                res.json(updatedQuiz);
            }
        } catch (error) {
            console.error("Error updating quiz:", error);
            res.status(500).send("Internal Server Error");
        }
    });

    // delete quiz
    app.delete("/api/quizzes/:quizId", async (req, res) => {
        const { quizId } = req.params;
        try {
            const status = await dao.deleteQuiz(quizId);
            if (status.deletedCount > 0) {
                res.sendStatus(200);
            } else {
                res.sendStatus(404);
            }
            // res.json(status);
        } catch (error) {
            console.error("Error deleting quiz:", error);
            res.status(500).send("Internal Server Error");
        }
    });
}

export default QuizzesRoutes;