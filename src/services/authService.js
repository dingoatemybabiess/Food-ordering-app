const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const users = []; // Replace with DB in real app

const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
const jwtSecret = process.env.JWT_SECRET || "your_jwt_secret";

exports.register = async (email, password) => {
  if (users.find((u) => u.email === email)) {
    return { success: false, message: "User already exists" };
  }
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  users.push({ email, password: hashedPassword });
  return { success: true };
};

exports.login = async (email, password) => {
  const user = users.find((u) => u.email === email);
  if (!user) return { success: false, message: "Invalid credentials" };

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return { success: false, message: "Invalid credentials" };

  const token = jwt.sign({ email: user.email }, jwtSecret, { expiresIn: "1h" });
  return { success: true, token };
};
