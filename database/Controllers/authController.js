const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { username, email, mobileNo, address, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const newUser = new User({
      username,
      email,
      mobileNo,
      address,
      password,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (password !== user.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '5h' });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    console.log("user", user);

    res.json({
      token,
      user: {
        username: user.username,
        email: user.email,
        address: user.address,
        mobileNo: user.mobileNo,
      },
    }); // Send user data along with token
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// const login = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }

//         const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

//         res.json({ token });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error });
//     }
// };

module.exports = {
  register,
  login,
};
