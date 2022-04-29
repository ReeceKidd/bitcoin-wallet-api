import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";
import * as bodyParser from "body-parser";

import { router } from "./index";

dotenv.config();

export default () => {
  const app = express();
  app.use(helmet());
  app.use(cors());
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(router);

  return app;
};
