import assignmentModel from "./model.js";
// import mongoose from "mongoose";

export const findAllAssignments = () => assignmentModel.find();
// export const findAssignmentsById = (id) => assignmentModel.findOne({ id: id });
export const findAssignmentById = (id) => assignmentModel.findById(id);
export const createAssignment = (assignment) => { 
    delete assignment._id;
    return assignmentModel.create(assignment); 
};
export const updateAssignment = (id, assignment) => assignmentModel.updateOne({ _id: id }, { $set: assignment });
export const deleteAssignment = (id) => assignmentModel.deleteOne({ _id: id });