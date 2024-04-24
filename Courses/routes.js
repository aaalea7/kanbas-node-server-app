import * as dao from "./dao.js";

export default function CourseRoutes(app) {
    // get course by id
    app.get("/api/courses/:courseId", async(req, res) => {
        const courseId = req.params.courseId;
        try {
            const course = await dao.findCourseById(courseId);
            if (!course) {
                res.status(404).send("Course not found");
            } else {
                res.send(course);
            }
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    });
    
    // update course
    app.put("/api/courses/:courseId", async(req, res) => {
        const { courseId } = req.params;
        const course = req.body;
        const status = await dao.updateCourse(courseId, course);
        // res.sendStatus(204);
        res.json(status);
    });

    // delete course
    app.delete("/api/courses/:courseId", async(req, res) => {
        const { courseId } = req.params;
        const status = await dao.deleteCourse(courseId);
        res.json(status);
    });

    // create course
    app.post("/api/courses", async(req, res) => {
        const course = await dao.createCourse(req.body);
        res.json(course);
    });

    app.get("/api/courses", async(req, res) => {
        const courses = await dao.findAllCourses();
        // res.send(courses);
        res.json(courses);
    });
};