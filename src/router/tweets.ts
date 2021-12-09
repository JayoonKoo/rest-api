import express from "express";
import "express-async-errors";
import { Tweet, tweets } from "../mock/tweet";

const router = express.Router();
// get Tweets, findByUsername
router.get("/", (req, res) => {
  const { username } = req.query;
  if (!username) {
    return res.json(tweets);
  }
  const findByName = tweets.filter((tweet) => tweet.name === username);
  return res.json(findByName);
});

// byid
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const findById = tweets.find((tweet) => tweet.id === id);
  if (findById) {
    res.status(200).json(findById);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
});

// create tweet
router.post("/", (req, res) => {
  const { text, name, username, url } = req.body;
  const newTweet: Tweet = {
    id: Date.now().toString(),
    createdAt: new Date(),
    name,
    text,
    username,
    url: url,
  };
  tweets.unshift(newTweet);
  res.status(201).json(newTweet);
});

// Delete tweet
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = tweets.findIndex((tweet) => tweet.id === id);
  tweets.splice(index, 1);
  res.sendStatus(204);
});

// update tweet
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  let findTweet = tweets.find((tweet) => tweet.id === id);
  if (findTweet) {
    findTweet.text = text;
    res.status(200).json(findTweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
});

export default router;
