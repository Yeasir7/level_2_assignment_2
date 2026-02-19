import { Router } from "express";
import { vehicleController } from "./vehicles.controller";
import auth from "../../middleware/auth";

const router = Router();

router.post("/", auth("admin"), vehicleController.createVehicle);

router.get("/", vehicleController.getAllVehicles);

router.get("/:id", vehicleController.getSingleVehicles)

router.put("/:id", auth("admin"), vehicleController.updateSingleVehicles);

router.delete("/:id", auth("admin"), vehicleController.deleteSingleVehicles)

export const vehicleRouter = router;
