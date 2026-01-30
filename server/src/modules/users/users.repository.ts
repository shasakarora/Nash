import { PoolClient } from "pg";
import pool from "../../config/db.js";

const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const createUser = async (
  username: string,
  email: string,
  client: PoolClient,
) => {
  let referralCode = "";
  for (let i = length; i > 0; --i) {
    referralCode += chars[Math.floor(Math.random() * chars.length)];
  }

  const result = await client.query(
    `INSERT INTO users (username, email, referral_code)
	VALUES ($1, $2, $3)
	RETURNING *`,
    [username, email, referralCode],
  );

  return result.rows[0];
};

export const findUserByEmail = async (email: string) => {
  const result = await pool.query(
    `SELECT *
	FROM users
	WHERE email=$1`,
    [email],
  );

  if (!result.rows[0]) return null;

  return result.rows[0];
};
