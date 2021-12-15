import express from "express";
import "express-async-errors";
import { body } from "express-validator";
import * as tweetsController from "../controller/tweetsController";
import { validate } from "../middleware/validator";

const router = express.Router();
// get Tweets, findByUsername
router.get("/", tweetsController.getTweets);

// byid
router.get("/:id", tweetsController.getTweet);

const validateTweet = [
  body("text")
    .trim()
    .isLength({ min: 3 })
    .withMessage("text should be at last 3 characters"),
  validate,
];

// create tweet
router.post("/", validateTweet, tweetsController.createTweet);

// Delete tweet
router.delete("/:id", tweetsController.deleteTweet);

// update tweet
router.put("/:id", validateTweet, tweetsController.updateTweet);

export default router;
