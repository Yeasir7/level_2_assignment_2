import { Router } from "express";
import auth from "../../middleware/auth";
import { userController } from "./users.controller";

const router = Router()

router.get("/", auth("admin"), userController.getAllUsers);

export const userRouter = router