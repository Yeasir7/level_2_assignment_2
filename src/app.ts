import express, { Request, Response } from "express";
import cors from "cors";
import initDB from "./config/db";
import { authRouter } from "./modules/auth/auth.routes";
import { userRouter } from "./modules/users/users.routes";
import { vehicleRouter } from "./modules/vehicles/vehicles.routes";

const app = express();

app.use(express.json());
app.use(cors());

initDB();

// auth
app.use("/api/v1/auth", authRouter);
// user
app.use("/api/v1/users", userRouter)
//vehicles
app.use("/api/v1/vehicles", vehicleRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("server is running nice");
});

export default app;
