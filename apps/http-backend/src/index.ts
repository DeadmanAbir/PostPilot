import express from "express";
// import {DemoType} from "@repo/common/types";
import fileRouter from "@/routes/context-processing-route";
import postRouter from "@/routes/post-generation.route";
import profileRouter from "@/routes/user-route";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello Worldss!");
});

app.use("/api", fileRouter);
app.use("/api", postRouter);
app.use("/api", profileRouter);

app.listen(9000, () => {
  console.log("Server is running on port 9000");
});
