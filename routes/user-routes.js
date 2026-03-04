const express = require('express');
const { Sequelize } = require('sequelize');
require('dotenv').config();

let db;
let User;

if (process.env.NODE_ENV == 'test') {
    ({ db, User } = require('../test_database/test_setup'));
} else {
    ({ db, User } = require('../database/setup'));
}

// GET /api/users
// Returns all users
async function getAllUsers(req, res) {
    try {
        const users = await User.findAll({});

        res.json(users);
    } catch (error) {
        console.error("Error fetching users", error);
        res.status(500).json({ error: "Error fetching users" })
    }
}

// POST /api/users
// Creates a new user
async function createNewUser(req, res) {
    try {
        const { username, password, role } = req.body;

        const newUser = await User.create({
            username,
            password,
            role
        });

        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user', error);
        res.status(500).json({error: "Failed to create user"});
    }
}

module.exports = {
    getAllUsers,
    createNewUser
}