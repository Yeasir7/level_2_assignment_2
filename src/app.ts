import express, { Request, Response } from "express";
import cors from "cors";
import initDB from "./config/db";
import { authRouter } from "./modules/auth/auth.routes";

const app = express();

app.use(express.json());
app.use(cors());

initDB();

// users
app.use("/api/v1/auth", authRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("server is running nice");
});

export default app;
