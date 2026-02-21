import { Request, Response } from "express";
import { userServices } from "./users.services";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsersFromDB();

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const updateUsers = async (req: Request, res: Response) => {
  try {
    const user = req?.user
    let result;

    if (user?.role === "admin") {
      result = await userServices.adminUpdateUsersFromDB(
        req.body,
        req.params.id as string,
      );
    } else if (user?.role === "customer" && String(user?.id) === req.params.id) {
      result = await userServices.customerUpdateUsersFromDB(req.body, user?.id);
    } else {
      throw new Error("You are not authorized");
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.deleteUsersFromDB(
      req.params.id as string,
    );

    if (result.rowCount === 0) {
      throw new Error("User not found");
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: null,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const userController = {
  getAllUsers,
  updateUsers,
  deleteUser,
};
