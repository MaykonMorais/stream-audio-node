import { readFileSync, createReadStream, statSync } from "fs";
import scdl from "soundcloud-downloader";
import express, { Application, Request, Response } from "express";
import { Error } from "./types";

const SOUNDCLOUD_URL =
  "https://soundcloud.com/trapbrasileiroriginal/md-chefe-ft-domlaike-rei-lacoste";
const CLIENT_ID = "YxQYlFPNletSMSZ4b8Svv9FTYgbNbM79";

const app: Application = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req: Request, res: Response) => {
  let audioInfo = await scdl.getInfo(SOUNDCLOUD_URL);

  let size = 100000000;
  if (audioInfo.duration) {
    size = 128 * (audioInfo.duration / 60000);
  }

  scdl.download(SOUNDCLOUD_URL).then((stream) => stream.pipe(res));

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
