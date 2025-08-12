const db = require("../config/db");
const generateUUID = require("../utils/generateUUID");

// Dummy example: Replace with your DB logic
const users = [
  { id: 1, username: "user1", password: "password1" }, // Use hashed passwords in production!
];

async function findUserByUsername(username) {
  return users.find((user) => user.username === username);
}

async function findUserByEmail(email) {
  const normalizedEmail = email.trim().toLowerCase();
  const result = await db.query(`SELECT * FROM users WHERE email = ?`, [normalizedEmail]);
  return result[0];
}

const createUserTable = async () => {
  const sql = `
        CREATE TABLE IF NOT EXISTS users(
            id VARCHAR(50) NOT NULL,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL
        )
    `;
  await db.query(sql);
};

const ifEmailExists = async (email) => {
  const normalizedEmail = email.trim().toLowerCase();
  const user = await db.query(`SELECT * FROM users WHERE email = ?`, [
    normalizedEmail,
  ]);
  return user[0];
};

const createUser = async (name, email, password) => {
  const id = generateUUID();
  const user = await db.query(
    `INSERT INTO users(id, name, email, password) VALUES (?,?,?,?)`,
    [id, name, email, password]
  );
  return user;
};

module.exports = {
  findUserByUsername,
  findUserByEmail,
  createUserTable,
  ifEmailExists,
  createUser,
};
