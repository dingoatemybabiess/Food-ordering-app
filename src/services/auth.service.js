const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
const jwtSecret = process.env.JWT_SECRET || "your_jwt_secret";

exports.register = async (db, email, password, name) => {
  try {
    // Check if user exists
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (rows.length > 0) {
      return { success: false, message: "User already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert new user
    await db.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, "customer"]
    );

    return { success: true };
  } catch (error) {
    console.error("Service registration error:", error);
    throw error;
  }
};

exports.login = async (db, email, password) => {
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (rows.length === 0)
      return { success: false, message: "Invalid credentials" };

    const user = rows[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return { success: false, message: "Invalid credentials" };

    const token = jwt.sign(
      { email: user.email, id: user.user_id, role: user.role },
      jwtSecret,
      { expiresIn: "1h" }
    );
    return { success: true, token };
  } catch (error) {
    console.error("Service login error:", error);
    throw error;
  }
};
