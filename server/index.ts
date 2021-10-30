import { readFileSync, createReadStream, statSync } from "fs";
import express, { Application, Request, Response } from "express";
import { Error } from "./types";

const app: Application = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req: Request, res: Response) => {
  const file = "./data/linkinpark.mp3";
  const { size } = statSync(file);
  const highWaterMark = 2;

  createReadStream(file, { highWaterMark }).pipe(res);

  return res.writeHead(200, {
    "Content-Length": size,
    "Content-Type": "audio/mpeg",
  });
});

try {
  app.listen(port, (): void => {
    console.log("App running on port ", port);
  });
} catch (error: any) {
  console.error(`Error ocurred:  ${error.message}`);
}
