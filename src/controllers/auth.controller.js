const authService = require("../services/auth.service");

exports.registerUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });

    // Use provided name or default to email prefix
    const userName = name || email.split("@")[0];

    const db = req.app.locals.db;
    const result = await authService.register(db, email, password, userName);
    if (!result.success) return res.status(409).json({ error: result.message });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Registration failed" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });

    const db = req.app.locals.db;
    const result = await authService.login(db, email, password);
    if (!result.success) return res.status(401).json({ error: result.message });

    res.json({ token: result.token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
};

exports.getProfile = (req, res) => {
  res.json({ message: `Welcome ${req.user.email}`, user: req.user });
};
