import userModel from "./model.js";

export const findAllUsers = () => userModel.find();
export const findUserById = (id) => userModel.findById(id);
// export const findUserById = (id) => userModel.findOne({ id: id });
export const findUserByUsername = (username) => userModel.findOne({ username: username });
export const findUserByCredentials = (username, password) => 
    userModel.findOne({ username: username, password: password, });
export const findUsersByRole = (role) => userModel.find({ role: role });
export const findUserByEmail = (email) => userModel.findOne({ email: email, });
export const createUser = (user) => {
    delete user._id;
    return userModel.create(user);
}
export const updateUser = (id, user) => userModel.updateOne({ _id: id }, { $set: user });
export const deleteUser = (id) => userModel.deleteOne({ _id: id});
