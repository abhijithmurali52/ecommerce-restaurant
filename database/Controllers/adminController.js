const Admin = require('../Models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const registerAdmin = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        // const hashedPassword = await bcrypt.hash(password, 12);

        const newAdmin = new Admin({
            username,
            email,
            password,
        });

        await newAdmin.save();

        const token = jwt.sign({ adminId: newAdmin._id }, 'your_jwt_secret', { expiresIn: '1h' });

        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // const isMatch = await bcrypt.compare(password, admin.password);
        // if (!isMatch) {
        //     return res.status(400).json({ message: 'Invalid credentials' });
        // }
        if (password !== admin.password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ adminId: admin._id }, 'your_jwt_secret', { expiresIn: '1h' });

        res.json({ token, admin: { username: admin.username, email: admin.email } });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    registerAdmin,
    loginAdmin,
};
