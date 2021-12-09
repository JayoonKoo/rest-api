import { tweets } from "../data/tweet";

export const getTweet = (username?: string) => {
  if (!username) {
    return tweets;
  }
  return tweets.filter((tweet) => tweet.name === username);
};
