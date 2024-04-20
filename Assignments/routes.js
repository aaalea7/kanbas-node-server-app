import * as dao from "./dao.js";

function AssignmentsRoutes(app) {
    // find all assignments
    app.get("/api/assignments", async (req, res) => { // /api/courses/:cid/assignments
        try {
            const assignments = await dao.findAllAssignments();
            if (!assignments) {
                res.status(404).send("Assignment not found");
            } else {
                res.send(assignments);
            }
        } catch (error) {
            console.error("Error fetching assignment:", error);
            res.status(500).send("Internal Server Error");
        }
    });

    // create assignment
    app.post("/api/courses/:cid/assignments", async(req, res) => {
        const { cid } = req.params;
        try {
            const assignmentData = {
                ...req.body,
                course: cid,
                id: new Date().getTime().toString(),
            };
            const newAssignment = await dao.createAssignment(assignmentData);
            res.status(201).send(newAssignment);
        } catch (error) {
            console.error("Error creating assignment:", error);
            res.status(500).send("Internal Server Error");
        }
    });

    // find assignment by course id
    // app.get("/api/courses/:cid/assignments", async (req, res) => {
    //     const { cid } = req.params;
    //     const assignments = await dao.findAssignmentsByCourse(cid);
    //     res.json(assignments);
    // });
    app.get('/api/courses/:cid/assignments', async (req, res) => {
        const cid = req.params.cid;
        console.log("Requested Course ObjectId:", cid);
        try {
            const course = await dao.findCourseByCId(cid);
            if (!course) {
                console.log("No course found for ObjectId:", cid);
                return res.status(404).json({ message: 'Course not found' });
            }
            const assignments = await dao.findAssignmentsByCourse(course.id);
            if (!assignments || assignments.length === 0) {
                console.log("No assignments found for Course ID:", course.id);
                return res.status(404).json({ message: 'No assignments found for this course' });
            }
    
            res.json(assignments);
        } catch (error) {
            console.error('API Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });
    
    // update assignment
    app.put("/api/assignments/:aid", async (req, res) => {
        const { id } = req.params;
        try {
            const updatedAssignment = await dao.updateAssignment(id, req.body);
            if (updatedAssignment.modifiedCount > 0) {
                res.json(await dao.findAssignmentById(id)); // Fetch the updated document to return
            } else {
                res.sendStatus(404);
            }
        } catch (error) {
            console.error("Error updating assignment:", error);
            res.status(500).send("Internal Server Error");
        }
    });

    // delete assignment
    app.delete("/api/assignments/:aid", async (req, res) => {
        const { aid } = req.params;
        try {
            const result = await dao.deleteAssignment(aid);
            if (result.deletedCount > 0) {
                res.sendStatus(200);
            } else {
                res.sendStatus(404);
            }
        } catch (error) {
            console.error("Error deleting assignment:", error);
            res.status(500).send("Internal Server Error");
        }
    });
}

export default AssignmentsRoutes;