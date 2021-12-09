import express, { Request } from "express";
import "express-async-errors";
import * as tweetsController from "../controller/tweetsController";

const router = express.Router();
// get Tweets, findByUsername
router.get("/", tweetsController.getTweets);

// byid
router.get("/:id", tweetsController.getTweet);

// create tweet
router.post("/", tweetsController.createTweet);

// Delete tweet
router.delete("/:id", tweetsController.deleteTweet);

// update tweet
router.put("/:id", tweetsController.updateTweet);

export default router;
