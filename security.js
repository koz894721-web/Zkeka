'use strict';

const express = require('express');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();

// Rate Limiting Middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // Limit each IP to 100 requests per windowMs
});

app.use(limiter);

// Middleware for parsing JSON
app.use(express.json());

// Input Validation Function
const validateInput = (input) => {
    // Add your validation logic here
    return input && typeof input === 'string' && input.trim() !== '';
};

// JWT Authentication Middleware
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (token) {
        jwt.verify(token, 'your_jwt_secret_key', (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

// Password Hashing Function
const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

// Admin Authorization Check
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.sendStatus(403);
    }
};

module.exports = {
    validateInput,
    authenticateJWT,
    hashPassword,
    isAdmin
};
