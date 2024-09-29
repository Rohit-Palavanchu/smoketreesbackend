const express = require('express');
const router = express.Router();
const db = require('../models/db');
const { v4: uuidv4 } = require('uuid');

router.post('/register', (req, res) => {
    const { name, address } = req.body;

    if (!name || !address) {
        return res.status(400).json({ error: 'Name and address are required' });
    }

    const userId = uuidv4();
    const addressId = uuidv4();

    const addUserQuery = `INSERT INTO USERS (id, name) VALUES (?, ?)`;
    const checkAddressQuery = `SELECT * FROM ADDRESS WHERE address = ? AND userId = ?`;
    const addAddressQuery = `INSERT INTO ADDRESS (id, userId, address) VALUES (?, ?, ?)`;

    db.run(addUserQuery, [userId, name], (err) => {
        if (err) {
            console.error('Error inserting user:', err);
            return res.status(500).json({ error: 'Internal server error while adding user' });
        }

        db.get(checkAddressQuery, [address, userId], (err, row) => {
            if (err) {
                console.error('Error checking address:', err);
                return res.status(500).json({ error: 'Internal server error while checking address' });
            }

            if (row) {
                return res.status(400).json({ error: 'This address already exists for the user' });
            }

            db.run(addAddressQuery, [addressId, userId, address], (err) => {
                if (err) {
                    console.error('Error inserting address:', err);
                    return res.status(500).json({ error: 'Internal server error while adding address' });
                }

                res.status(200).json({ message: 'Details inserted successfully' });
            });
        });
    });
});

module.exports = router;
