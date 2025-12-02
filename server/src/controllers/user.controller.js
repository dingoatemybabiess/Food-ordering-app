exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, phone } = req.body;
    const db = req.app.locals.db;

    await db.query(
      "UPDATE users SET name = ?, phone = ? WHERE user_id = ?",
      [name, phone, userId]
    );

    res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Update failed" });
  }
};
