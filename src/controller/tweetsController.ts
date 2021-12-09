import { Tweet, tweets } from "../data/tweet";

export const getTweet = (username?: string) => {
  if (!username) {
    return tweets;
  }
  return tweets.filter((tweet) => tweet.name === username);
};

export const getById = (id: string) => {
  const findById = tweets.find((tweet) => tweet.id === id);
  if (findById) {
    return {
      success: true,
      findById,
    };
  } else {
    return {
      success: false,
      message: `Tweet id(${id}) not found`,
    };
  }
};

type CreateType = {
  text: string;
  name: string;
  username: string;
  url?: string;
};
export const createTweet = (createReq: CreateType) => {
  const { name, text, username, url } = createReq;
  const newTweet: Tweet = {
    id: Date.now().toString(),
    createdAt: new Date(),
    name,
    text,
    username,
    url: url,
  };
  tweets.unshift(newTweet);
  return newTweet;
};

export const deleteTweet = (id: string) => {
  const index = tweets.findIndex((tweet) => tweet.id === id);
  tweets.splice(index, 1);
};

type UpdateReq = {
  text: string;
  id: string;
};
export const updateTweet = ({ id, text }: UpdateReq) => {
  let findTweet = tweets.find((tweet) => tweet.id === id);
  if (findTweet) {
    findTweet.text = text;
    return {
      success: true,
      updateTweet: findTweet,
    };
  } else {
    return {
      success: false,
      message: `Tweet id(${id}) not found`,
    };
  }
};
