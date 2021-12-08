import express from "express";
import { tweets } from "./mock/tweet";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/tweets", (req, res) => {
  res.json(tweets);
});

app.listen(port, () => {
  console.log(`server openned ${port}...`);
});
