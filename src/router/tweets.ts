import express, { Request } from "express";
import "express-async-errors";
import { Tweet } from "../data/tweet";
import {
  createTweet,
  deleteTweet,
  getById,
  getTweet,
  updateTweet,
} from "../controller/tweetsController";

const router = express.Router();
// get Tweets, findByUsername
router.get("/", (req: Request<{}, {}, {}, Tweet>, res) => {
  const { username } = req.query;
  const tweet = getTweet(username);
  return res.json(tweet);
});

// byid
router.get("/:id", (req: Request<Tweet>, res) => {
  const { id } = req.params;
  const tweet = getById(id);
  if (tweet.success) {
    res.status(200).json(tweet.findById);
  } else {
    res.status(404).json({ message: tweet.message });
  }
});

// create tweet
router.post("/", (req: Request<{}, Tweet>, res) => {
  const createReq = req.body;
  res.status(201).json(createTweet(createReq));
});

// Delete tweet
router.delete("/:id", (req: Request<Tweet>, res) => {
  const { id } = req.params;
  deleteTweet(id);
  res.sendStatus(204);
});

// update tweet
router.put("/:id", (req: Request<Tweet, {}, Tweet>, res) => {
  const { id } = req.params;
  const { text } = req.body;

  const tweet = updateTweet({ id, text });
  if (tweet.success) {
    res.status(200).json(tweet.updateTweet);
  } else {
    res.status(404).json({ message: tweet.message });
  }
});

export default router;
