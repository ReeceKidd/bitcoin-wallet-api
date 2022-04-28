import express from "express";
import dotenv from "dotenv";

dotenv.config();

export default () => {
  const app = express();

  return app;
};
