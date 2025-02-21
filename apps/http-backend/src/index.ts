import express from "express";
// import {DemoType} from "@repo/common/types";
import fileRouter from "@/routes/context-processing-route";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Worldss!");
});

app.use("/api", fileRouter);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
