import assignmentModel from "./model.js";
import courseModel from '../Courses/model.js';
// import mongoose from "mongoose";

export const findAllAssignments = () => assignmentModel.find();
export const findAssignmentsById = (id) => assignmentModel.findOne({ id: id });
// export const findAssignmentsByCourse = (cid) => assignmentModel.find({ course: cid });
export const createAssignment = (assignment) => { 
    delete assignment._id;
    return assignmentModel.create(assignment); 
};
export const updateAssignment = (id, assignment) => assignmentModel.updateOne({ _id: id }, { $set: assignment });
export const deleteAssignment = (id) => assignmentModel.deleteOne({ _id: id });

export const findAssignmentsByCourse = (courseId) => assignmentModel.find({ course: courseId });

// export const findCourseByCId = async (cid) => {
//     try {
//         const course = await courseModel.findById(cid);
//         return course;
//     } catch (error) {
//         console.error('Error finding course by ObjectId:', error);
//         throw error;
//     }
// };

// export const findAssignmentsByCourse = async (id) => {
//     try {
//         const assignments = await assignmentModel.find({ course: id });
//         return assignments;
//     } catch (error) {
//         console.error('Error finding assignments by custom course ID:', error);
//         throw error;
//     }
// };
