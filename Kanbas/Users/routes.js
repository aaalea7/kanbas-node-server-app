import db from "../Database/index.js";

export default function UserRoutes(app) {
    app.get("/api/users", (req, res) => {
        res.send(db.users);
    });
    app.post("/api/users/register", (req, res) => {
        const { username, password } = req.body;
        if (db.users.find((u) => u.username === username)) {
            res.status(400).send("User already exists");
            return;
        }
        const newUser = { username, password, _id: Date.now().toString() };
        db.users.push(newUser);
        req.session["currentUser"] = newUser;
        res.send(newUser);
    });
    app.get("/api/users/profile", (req, res) => {
        if (!req.session.currentUser) {
            res.status(401).send("Not logged in");
            return;
        }
        res.send(req.session.currentUser);
    });
    app.post("/api/users/logout", (req, res) => {
        req.session.destroy();
        res.send("Logged out");
    });
    app.post("/api/users/login", (req, res) => {
        // console.log(req.body);
        const { username, password } = req.body;
        const user = db.users.find(
            (u) => u.username === username && u.password === password
        );
        if (user) {
            req.session.currentUser = user;
            res.send(user);
        } else {
            res.status(401).send("Invalid credentials");
        }
    });
}