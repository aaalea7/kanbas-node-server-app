import * as dao from "./dao.js";

function AssignmentsRoutes(app) {
    app.get("/api/assignments/:id", async (req, res) => {
        const { id } = req.params;
        try {
            const assignment = await dao.findAssignmentById(id);
            if (!assignment) {
                res.status(404).send("Assignment not found");
            } else {
                res.send(assignment);
            }
        } catch (error) {
            console.error("Error fetching assignment:", error);
            res.status(500).send("Internal Server Error");
        }
    });

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

    app.get("/api/courses/:cid/assignments", async (req, res) => {
        const { cid } = req.params;
        try {
            const courseAssignments = await dao.findAllAssignments({ course: cid });
            res.send(courseAssignments);
        } catch (error) {
            console.error("Error fetching assignments for course:", error);
            res.status(500).send("Internal Server Error");
        }
    });

    app.put("/api/assignments/:id", async (req, res) => {
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

    app.delete("/api/assignments/:id", async (req, res) => {
        const { id } = req.params;
        try {
            const result = await dao.deleteAssignment(id);
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