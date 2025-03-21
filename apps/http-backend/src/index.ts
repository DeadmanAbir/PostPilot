import express from "express";
import fileRouter from "@/routes/context-processing-route";
import postRouter from "@/routes/post-generation.route";
import profileRouter from "@/routes/user-route";
import linkedinRouter from "@/routes/linkedin-auth-route";
import cors from "cors";
import { authMiddleware } from "./middlewares/authMiddleware";
import session from "express-session";

declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}

const app = express();

app.use(express.json());
app.use(cors());

app.use(
  session({
    secret: "your-secret-key", // Replace with a secure random string
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
    },
  })
);

const publicRoutes = ["/", "/api/linkedin/callback"];

app.use((req, res, next) => {
  if (publicRoutes.includes(req.path)) {
    return next();
  }
  authMiddleware(req, res, next);
});

app.get("/", (req, res) => {
  res.send("Hello Worldss!");
});

app.use("/api", fileRouter);
app.use("/api", postRouter);
app.use("/api", profileRouter);
app.use("/api/linkedin", linkedinRouter);

app.listen(9000, () => {
  console.log("Server is running on port 9000");
});
