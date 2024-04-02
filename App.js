import "dotenv/config";
import session from "express-session";
import express from "express";
import Hello from "./Hello.js";
import Lab5 from "./Lab5.js";
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentsRoutes from "./Kanbas/Assignments/routes.js";
import cors from "cors";
import SecurityController from "./Kanbas/SecurityController.js";
import UserRoutes from "./Kanbas/Users/routes.js";
// require('dotenv').config();

const app = express();

app.use(
  cors({
    // origin: "http://localhost:3000",
    credentials: true,
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.FRONTEND_URL
        : process.env.FRONTEND_URL_LOCAL,
  })
);
app.use(express.json());
app.use(
    session({
        secret: "keyboard cat",
    })
)
AssignmentsRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
UserRoutes(app);
SecurityController(app);
Lab5(app);
Hello(app);
app.listen(process.env.PORT || 4000);