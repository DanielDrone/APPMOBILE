const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

module.exports = (db) => {
    // Register Endpoint
    router.post('/register', async (req, res) => {
        try {
            const { username, email, password } = req.body;

            if (!username || !email || !password) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            const usersCollection = db.collection('login_table');

            const existingUser = await usersCollection.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const newUser = { username, email, password: hashedPassword }; // Store hashed password
            await usersCollection.insertOne(newUser);

            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error("Error in /register:", error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    });

    // Login Endpoint
    router.post('/login', async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            const usersCollection = db.collection('login_table');
            const user = await usersCollection.findOne({ email }); // Find by email only

            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Compare provided password with stored hash
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // In a real app, return a JWT token
            res.status(200).json({ message: 'Login successful', user: { username: user.username, email: user.email } });
        } catch (error) {
            console.error("Error in /login:", error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    });

    // Users endpoint - returns list of users with hashed passwords (no sensitive data omitted)
    router.get('/users', async (req, res) => {
        try {
            const usersCollection = db.collection('login_table');
            const users = await usersCollection.find({}, { projection: { _id: 0, username: 1, email: 1, password: 1 } }).toArray();
            res.json(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });

    // Update Password Endpoint
    router.post('/update-password', async (req, res) => {
        try {
            const { email, currentPassword, newPassword } = req.body;

            if (!email || !currentPassword || !newPassword) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            const usersCollection = db.collection('login_table');
            const user = await usersCollection.findOne({ email });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Verify current password
            const isMatch = await bcrypt.compare(currentPassword, user.password);

            if (!isMatch) {
                return res.status(401).json({ message: 'Incorrect current password' });
            }

            // Hash new password
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

            await usersCollection.updateOne(
                { email },
                { $set: { password: hashedPassword } }
            );

            res.json({ message: 'Password updated successfully' });
        } catch (error) {
            console.error("Error in /update-password:", error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    });

    return router;
};
