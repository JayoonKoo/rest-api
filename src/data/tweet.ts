export type Tweet = {
  id: string; // 트윗 아이디
  text: string; // 트윗 텍스트
  createdAt: Date; // 트윗 생성 날짜
  name: string; // 사용자 이름
  username: string; // 사용자 닉네임 (아이디)
  url?: string; // 사용자 프로파일 사진 URL
};

export const tweets: Tweet[] = [
  {
    id: "1",
    text: "안녕하세요",
    createdAt: new Date("2021-12-03T04:21:00.914Z"),
    name: "Koo",
    username: "messi",
  },
  {
    id: "2",
    text: "누군데?",
    createdAt: new Date("2021-12-04T04:21:00.914Z"),
    name: "bob",
    username: "bobtista",
  },
  {
    id: "3",
    text: "아 저번에 맜났었나?",
    createdAt: new Date("2021-12-04T04:21:00.914Z"),
    name: "bob",
    username: "bobtista",
  },
];

export function getAll() {
  return tweets;
}

export function getAllByUsername(username: string) {
  return tweets.filter((tweet) => tweet.name === username);
}

export function getById(id: string) {
  return tweets.find((tweet) => tweet.id === id);
}

export type CreateType = {
  text: string;
  name: string;
  username: string;
  url?: string;
};
export function create({ name, text, username, url }: CreateType) {
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
}

export type UpdateReq = {
  text: string;
  id: string;
};
export function update({ text, id }: UpdateReq) {
  let findTweet = tweets.find((tweet) => tweet.id === id);
  if (findTweet) {
    findTweet.text = text;
  }
  return findTweet;
}

export function remove(id: string) {
  const index = tweets.findIndex((tweet) => tweet.id === id);
  tweets.splice(index, 1);
}
