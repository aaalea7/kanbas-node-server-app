import courseModel from "./model.js";
// import mongoose from "mongoose";

export const findAllCourses = () => courseModel.find();
// export const findCourseById = (id) => courseModel.findOne({ id: id });
export const findCourseById = (id) => courseModel.findById(id);
// replace with if app crashed: 
// export const findCourseById = async (id) => {
//     try {
//         let course = null;
//         if (mongoose.Types.ObjectId.isValid(id)) {
//             course = await courseModel.findById(id);
//         }
//         if (!course) { course = await courseModel.findOne({ id: id }); }
//         if (!course) { return { error: "Course not found" }; }
//         return course;
//     } catch (error) {
//         console.error('Error fetching course:', error);
//         return { error: "Failed to fetch course" };
//     }
// };

export const createCourse = (course) => { 
    delete course._id; 
    return courseModel.create(course); 
};
export const updateCourse = (id, course) => courseModel.updateOne({ _id: id }, { $set: course });
export const deleteCourse = (id) => courseModel.deleteOne({ _id: id });