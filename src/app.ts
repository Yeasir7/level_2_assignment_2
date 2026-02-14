import express, { Request, Response } from "express";
import cors from "cors";
import initDB from "./config.ts/db";

const app = express();

app.use(express.json());
app.use(cors());

initDB()

app.get("/", (req: Request, res: Response) => {
  res.send("server is running nice");
});

export default app;