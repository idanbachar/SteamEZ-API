import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import {
  CheckIsSteamProfileValid,
  GetSteamIDFromURL,
} from "./services/validation";
dotenv.config();

const app = express();
app.use("/", express.static("public"));
app.use(cors());

app.get("/getFullSteamUserData", (req: Request, res: Response) => {
  (async () => {
    const { steamUrl } = req.query;
    if (steamUrl) {
      const isSteamProfileValid = CheckIsSteamProfileValid(steamUrl.toString());

      if (isSteamProfileValid) {
        const steamId = await GetSteamIDFromURL(steamUrl.toString());
      } else {
        res.status(500).send("<h1>Error 505 Invalid steam URL</h1>");
      }
    }
  })();
});
