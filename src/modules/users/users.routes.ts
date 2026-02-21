import { Router } from "express";
import auth from "../../middleware/auth";
import { userController } from "./users.controller";

const router = Router()

router.get("/", auth("admin"), userController.getAllUsers);
router.put("/:id",auth("admin", "customer"), userController.updateUsers)
router.delete("/:id", auth("admin"), userController.deleteUser);

export const userRouter = router