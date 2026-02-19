import { Router } from "express";
import { vehicleController } from "./vehicles.controller";
import auth from "../../middleware/auth";

const router = Router();

router.get("/", vehicleController.getAllVehicles);

router.post("/", auth("admin"), vehicleController.createVehicle);

export const vehicleRouter = router;
