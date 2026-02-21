import { pool } from "../../config/db";

const getAllUsersFromDB = async () => {
  const result = await pool.query(
    `SELECT id, name, email, phone, role, created_at, updated_at FROM users`,
  );
  return result;
};
const adminUpdateUsersFromDB = async (payLoad:Record<string,unknown>, id:string) => {
  const {name, email, phone, role} = payLoad
  const result = await pool.query(
    `UPDATE users SET name=$1, email=$2, phone=$3, role=$4 WHERE id=$5 RETURNING id, name, email, phone, role`,
    [name, email, phone, role, id],
  );
  return result;
};
const customerUpdateUsersFromDB = async (
  payLoad: Record<string, unknown>,
  customer_id: string,
) => {
  const { name, email, phone, role } = payLoad;
  const result = await pool.query(
    `UPDATE users SET name=$1, email=$2, phone=$3 WHERE id=$4 RETURNING id, name, email, phone, role`,
    [name, email, phone, customer_id],
  );
  return result;
};
const deleteUsersFromDB = async (id: string) => {
  const result = await pool.query(`DELETE FROM users WHERE id=$1 RETURNING *`, [
    id,
  ]);
  return result;
};

export const userServices = {
  getAllUsersFromDB,
  adminUpdateUsersFromDB,
  customerUpdateUsersFromDB,
  deleteUsersFromDB,
};
