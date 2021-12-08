import express from "express";
import { Tweet, tweets } from "./mock/tweet";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// get Tweets, findByUsername
app.get("/tweets", (req, res) => {
  const { username } = req.query;
  if (!username) {
    return res.json(tweets);
  }
  const findByName = tweets.filter((tweet) => tweet.name === username);
  return res.json(findByName);
});

// byid
app.get("/tweets/:id", (req, res) => {
  const { id } = req.params;
  const findById = tweets.find((tweet) => tweet.id === id);
  return res.json(findById);
});

// create tweet
app.post("/tweets", (req, res) => {
  const { text, name, username, url } = req.body;
  const newTweet: Tweet = {
    id: String(Number(tweets[tweets.length - 1].id) + 1),
    createdAt: new Date(),
    name,
    text,
    username,
    url: url,
  };
  tweets.push(newTweet);
  res.json(newTweet);
});

// update tweet
app.put("/tweets/:id", (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  let findTweet = tweets.find((tweet) => tweet.id === id);
  if (findTweet) {
    findTweet.text = text;
  }
  res.json(findTweet);
});

// Delete tweet
app.delete("/tweets/:id", (req, res) => {
  const { id } = req.params;
  const index = tweets.findIndex((tweet) => tweet.id === id);
  tweets.splice(index, 1);
  res.json(true);
});

app.listen(port, () => {
  console.log(`server openned ${port}...`);
});
