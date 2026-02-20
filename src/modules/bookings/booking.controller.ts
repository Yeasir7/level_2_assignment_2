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


export const bookingController = {
  createBooking,
  getAllBooking,
};
