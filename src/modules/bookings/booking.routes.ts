import { Router } from "express";
import auth from "../../middleware/auth";
import { bookingController } from "./booking.controller";

const router = Router();

router.post("/", auth("admin", "customer"), bookingController.createBooking);
router.get("/", auth("admin"), bookingController.getAllBooking);
router.get("/:id", auth("customer"), bookingController.getSingleBooking)

export const bookingRouter = router;
