import { pool } from "../../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";

const registerUser = async (payLoad: Record<string, unknown>) => {
  const { name, email, password, phone, role } = payLoad;

  const hashPassword = await bcrypt.hash(password as string, 10);

  const result = await pool.query(
    `
        INSERT INTO users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING id, name, email, phone, role
        `,
    [name, email, hashPassword, phone, role],
  );
  return result;
};

const loginDB = async (payLoad: Record<string, unknown>) => {
  const { email, password } = payLoad;
  const result = await pool.query(
    `
    SELECT * FROM users WHERE email=$1
    `,
    [email],
  );
  if (result.rows.length === 0) {
    throw new Error("user not found");
  }
  const user = result.rows[0];

  const isPassMatch = await bcrypt.compare(password as string, user.password);

  if (!isPassMatch) {
    throw new Error("password not match");
  }

  const token = jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    config.jwt_secret as string,
    {
      expiresIn: "7d",
    },
  );

  delete user.password

  return { token, user };
};

export const authServices = {
  registerUser,
  loginDB,
};
