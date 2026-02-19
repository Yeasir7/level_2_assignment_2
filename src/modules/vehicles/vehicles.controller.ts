import { Request, Response } from "express";
import { vehicleServices } from "./vehicles.services";

const createVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.createVehicleInDB(req.body);
    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.getAllVehiclesFromDB();
    res.status(200).json({
      success: true,
      message: "Vehicles retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const getSingleVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.getSingleVehiclesFromDB(
      req.params.id as string,
    );
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Vehicles not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicles retrieved successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateSingleVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.updateSingleVehiclesFromDB(
      req.body, req.params.id as string,
    );
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "Vehicles not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicle updated successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteSingleVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.deleteSingleVehiclesFromDB(
      req.params.id as string,
    );
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "Vehicles not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicle deleted successfully",
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const vehicleController = {
  createVehicle,
  getAllVehicles,
  getSingleVehicles,
  updateSingleVehicles,
  deleteSingleVehicles,
};
