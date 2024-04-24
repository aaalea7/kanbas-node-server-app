import "dotenv/config";
import session from "express-session";
import express from "express";
import Hello from "./Hello.js";
import Lab5 from "./Lab5.js";
import CourseRoutes from "./Courses/routes.js";
import ModuleRoutes from "./Modules/routes.js";
import AssignmentsRoutes from "./Assignments/routes.js";
import QuizzesRoutes from "./Quizzes/routes.js";
import QuestionsRoutes from "./Questions/routes.js";
import AnswersRoutes from "./Answers/routes.js";
import cors from "cors";
import SecurityController from "./SecurityController.js";
import UserRoutes from "./Users/routes.js";
import mongoose from "mongoose";

// require('dotenv').config();
const app = express();

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas-sp24-mon";
mongoose.connect(CONNECTION_STRING);

app.use(
  cors({ 
    origin: [process.env.FRONTEND_URL, process.env.FRONTEND_URL_LOCAL],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    optionsSuccessStatus: 200,
  })
);
const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
};

if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    httpOnly: true,
    domain: process.env.HTTP_SERVER_DOMAIN,
  };
}

app.use(session(sessionOptions));
app.use(express.json());

AnswersRoutes(app);
QuestionsRoutes(app);
QuizzesRoutes(app);
AssignmentsRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
UserRoutes(app);
SecurityController(app);
Lab5(app);
Hello(app);
app.listen(process.env.PORT || 4000);
