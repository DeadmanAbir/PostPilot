import express, { Express } from "express";
import fileRouter from "@/routes/context-processing-route";
import postRouter from "@/routes/post-generation.route";
import profileRouter from "@/routes/user-route";
import linkedinRouter from "@/routes/linkedin-auth-route";
import cors from "cors";
import { authMiddleware } from "./middlewares/authMiddleware";
import "dotenv/config";


const app: Express = express();
const port = process.env.PORT || 9000;
app.use(express.json());
app.use(cors());


const publicRoutes = ["/", "/api/linkedin/callback"];

app.use((req, res, next) => {
  if (publicRoutes.includes(req.path)) {
    return next();
  }
  authMiddleware(req, res, next);
});

app.get("/", (req, res) => {
  res.send("PostPilot is up and running!");
});

app.use("/api", fileRouter);
app.use("/api", postRouter);
app.use("/api", profileRouter);
app.use("/api/linkedin", linkedinRouter);

app.listen(port, () => {
  console.info(`Server is running on port ${port}`);
});
