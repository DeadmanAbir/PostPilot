import express from "express";
// import {DemoType} from "@repo/common/types";
const app = express();
// @ts-ignore
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
