import { Router } from "express";
import auth from "../../middleware/auth";
import { bookingController } from "./booking.controller";

const router = Router();

router.post("/", auth("admin", "customer"), bookingController.createBooking);
router.get("/", auth("admin", "customer"), bookingController.getAllBooking);
// router.put("/:bookingId");

export const bookingRouter = router;
