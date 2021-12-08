import express from "express";
import { tweets } from "./mock/tweet";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// get Tweets, findByUsername
app.get("/tweets", (req, res) => {
  const { username } = req.query;
  if (!username) {
    res.json(tweets);
  }
  const findByName = tweets.filter((tweet) => tweet.name === username);
  res.json(findByName);
});

app.listen(port, () => {
  console.log(`server openned ${port}...`);
});
