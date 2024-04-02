import db from "../Database/index.js";

function AssignmentsRoutes(app) {
    app.put("/api/assignments/:id", (req, res) => {
        //console.log("Request to update assignment with id:", req.params.aid);
        // console.log("Request body:", req.body);
        const { id } = req.params;
        const assignmentIndex = db.assignments.findIndex((a) => a._id === id);
        console.log("Found assignment index:", assignmentIndex);
        if (assignmentIndex > -1) {
            const updatedAssignment = {
                ...db.assignments[assignmentIndex],
                ...req.body,
            };
            db.assignments[assignmentIndex] = updatedAssignment;
            res.json(updatedAssignment); // Send back the updated assignment
        } else {
            res.sendStatus(404);
        }
    });


    app.delete("/api/assignments/:id", (req, res) => {
        const { id } = req.params;
        const initialLength = db.assignments.length;
        db.assignments = db.assignments.filter((a) => a._id !== id);
        if (db.assignments.length < initialLength) {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    });

    app.post("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const newAssignment = {
            ...req.body, 
            course: cid, 
            _id: new Date().getTime().toString()
        };
        db.assignments.unshift(newAssignment);
        // res.send(newAssignment);
        res.status(201).send(newAssignment);
    });

    app.get("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const courseAssignments = db.assignments.filter((a) => a.course === cid);
        // if (courseAssignments.length === 0) {
        //     res.status(404).send("No assignments found for the specified course");
        //     return;
        // }
        res.send(courseAssignments);
    });
    
    // app.get("/api/assignments", (req, res) => {
    //     const assignments = db.assignments;
    //     res.send(assignments);
    // });
}
export default AssignmentsRoutes;