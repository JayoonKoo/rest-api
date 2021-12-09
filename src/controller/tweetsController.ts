import { Tweet, tweets } from "../data/tweet";
import * as tweetRepository from "../data/tweet";
import { RequestHandler } from "express";

type GetAllQuery = {
  username?: string;
};
type GetParams = {
  id: string;
};
export const getTweets: RequestHandler<{}, {}, {}, GetAllQuery> = async (
  req,
  res
) => {
  const { username } = req.query;
  const data = await (username
    ? tweetRepository.getAllByUsername(username)
    : tweetRepository.getAll());
  res.status(200).json(data);
};

export const getTweet: RequestHandler<GetParams> = async (req, res, next) => {
  const { id } = req.params;
  const tweet = await tweetRepository.getById(id);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
};

export const createTweet: RequestHandler<{}, {}, tweetRepository.CreateType> =
  async (req, res, next) => {
    const reqBody = req.body;
    const tweet = await tweetRepository.create(reqBody);
    res.status(201).json(tweet);
  };

export const updateTweet: RequestHandler<
  GetParams,
  {},
  tweetRepository.UpdateReq
> = async (req, res, next) => {
  const { id } = req.params;
  const { text } = req.body;
  const tweet = await tweetRepository.update({ id, text });
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
};

export const deleteTweet: RequestHandler<GetParams> = async (
  req,
  res,
  next
) => {
  const { id } = req.params;
  await tweetRepository.remove(id);
  res.sendStatus(204);
};
