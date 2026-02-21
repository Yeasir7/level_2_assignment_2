import { Request, Response } from "express";
import { bookingServicers } from "./booking.sevices";

const createBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingServicers.createBookingInDB(req.body);
    // console.log(result);

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllBooking = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    let result;

    if (user?.role === "admin") {
      result = await bookingServicers.getBookingInDB();
    }
    else if(user?.role === "customer"){
      result = await bookingServicers.getSingleBookingInDB(
      user?.id,
    );
    }

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateBooking = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const bookingId = req.params.bookingId;
    let result;

    if (user?.role === "customer") {
      result = await bookingServicers.updateBookingCustomerInDB(bookingId as string);

      res.status(200).json({
        success: true,
        message: "Booking cancelled successfully",
        data: result,
      });
    } else if (user?.role === "admin") {
      result = await bookingServicers.updateBookingAdminInDB(bookingId as string);

      res.status(200).json({
        success: true,
        message: "Booking marked as returned. Vehicle is now available",
        data: result,
      });
    } else {
      throw new Error("You are not authorized");
    }
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};


export const bookingController = {
  createBooking,
  getAllBooking,
  updateBooking,
};
