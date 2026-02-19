import { pool } from "../../config/db";

const getAllUsersFromDB = async () => {
  const result = await pool.query(
    "SELECT id, name, email, phone, role, created_at, updated_at FROM users",
  );
  return result;
};

export const userServices = {
    getAllUsersFromDB
}
