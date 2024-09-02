// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const user = req.user;
    res.json({id: user.id, username: user.username, email: user.email});
  } catch (error) {
    res.status(500).json({message: "Error fetching user profile", error});
  }
};

module.exports = {
  getUserProfile,
};
