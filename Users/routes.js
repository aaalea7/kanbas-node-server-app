import * as dao from "./dao.js";

export default function UserRoutes(app) {
    const createUser = async (req, res) => {
        const user = await dao.createUser(req.body);
        res.json(user);
    };
    const updateUser = async (req, res) => {
        const { id } = req.params;
        try {
            const status = await dao.updateUser(id, req.body);
            const currentUser = await dao.findUserById(id);
            res.json(currentUser);
        } catch (error) {
            console.error("Update user failed:", error);
            res.status(500).send("Internal Server Error");
        }
    };
    const findAllUsers = async (req, res) => {
        const { role } = req.query;
        if (role) {
            const users = await dao.findUsersByRole(role);
            res.json(users);
            return;
        }
        const users = await dao.findAllUsers();
        res.json(users);
    };
    const deleteUser = async (req, res) => {
        const status = await dao.deleteUser(req.params.id);
        res.json(status);
    };
    const findUserById = async (req, res) => {
        const user = await dao.findUserById(req.params.id);
        res.json(user);
    };

    const findUserByUsername = async (req, res) => {
        const username = req.params.username;
        const user = await dao.findUserByUsername(username);
        res.json(user);
    };
    const signup = async (req, res) => {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                return res.status(400).json({ message: "Username and password are required" });
            }
            const user = await dao.findUserByUsername(req.body.username);
            if (user) {
                res.status(400).json(
                    { message: "Username already taken" });
            }
            const currentUser = await dao.createUser(req.body);
            req.session["currentUser"] = currentUser;
            res.json(currentUser);
        } catch (error) {
            console.error("Sign up error:", error);
            res.status(500).send("Internal Server Error");
        }
    };
    const signin = async (req, res) => {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                return res.status(400).json({ message: "Username and password are required" });
            }
            const currentUser = await dao.findUserByCredentials(username, password);
            if (currentUser) {
                req.session["currentUser"] = currentUser;
                res.json(currentUser);
            } else {
                console.log("Authentication failed for user:", username);
                res.sendStatus(401);
            }
        } catch (error) {
            console.error("Sign in error:", error);
            res.status(500).send("Internal Server Error");
        }
    };
    const signout = (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };
    const profile = async (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.sendStatus(401);
            return;
        }
        res.json(currentUser);
    };

    app.post("/api/users", createUser);
    app.get("/api/users", findAllUsers);
    app.get("/api/users/:id", findUserById);
    app.put("/api/users/:id", updateUser);
    app.delete("/api/users/:id", deleteUser);
    app.post("/api/users/signup", signup);
    app.post("/api/users/signin", signin);
    app.post("/api/users/signout", signout);
    app.post("/api/users/profile", profile);
    app.get("/api/users/username/:username", findUserByUsername);
}