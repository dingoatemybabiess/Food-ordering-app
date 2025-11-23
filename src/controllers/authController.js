const authService = require("../services/authService");

exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });

    const result = await authService.register(email, password);
    if (!result.success) return res.status(409).json({ error: result.message });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });

    const result = await authService.login(email, password);
    if (!result.success) return res.status(401).json({ error: result.message });

    res.json({ token: result.token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

exports.getProfile = (req, res) => {
  res.json({ message: `Welcome ${req.user.email}`, user: req.user });
};
