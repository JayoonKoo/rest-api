import express, { ErrorRequestHandler } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import "express-async-errors";
import { Tweet, tweets } from "./data/tweet";
import tweetsRouter from "./router/tweets";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(helmet());
app.use(cors());

// router
app.use("/tweets", tweetsRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.error(error);
  res.status(500);
};
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server openned ${port}...`);
});
