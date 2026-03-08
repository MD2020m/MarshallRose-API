const express = require('express');
const { Sequelize } = require('sequelize');
require('dotenv').config();

let db;
let Review;

if (process.env.NODE_ENV == 'test') {
    ({ db, Review } = require('../test_database/test_setup'));
} else {
    ({ db, Review } = require('../database/setup'));
}

async function getAllReviews(req, res) {
    try {
        const reviews = await Review.findAll({});

        res.json(reviews);
    } catch (error) {
        console.error("Error fetching reviews: ", error);
        res.status(500).json({ error: "Error fetching reviews" })
    }
}

async function createNewReview(req, res) {
    try {
        const { roses, reviewerId, prodId } = req.body;

        const newReview = await Review.create({
            roses,
            userId,
            productId
        });

        res.status(201).json(newReview);
    } catch (error) {
        console.error("Error creating review: ", error);
        res.status(500).json({ error: 'Failed to create review' });
    }
}

module.exports = {
    getAllReviews,
    createNewReview
};