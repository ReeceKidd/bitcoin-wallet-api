import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import * as bodyParser from "body-parser";

import { mnemonicMiddleware } from "./middlewares/getMnemonicMiddleware";

dotenv.config();

export default () => {
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  app.get("/mnemonic", mnemonicMiddleware);

  return app;
};
