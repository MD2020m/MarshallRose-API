const express = require('express');
const { db, Product } = require('../database/setup');
const { Sequelize } = require('sequelize');
require('dotenv').config();

// GET /api/products
// Returns all products
async function getAllProducts(req, res) {
    try {
        const products = await Product.findAll({});

        //console.log(products);

        res.json(products);
    } catch (error) {
        console.error("Error fetching products", error);
        res.status(500).json({ error: "Error fetching products"})
    }
}

// GET /api/products/:category
// Returns all products
async function getProductsByCategory(req, res) {
    try {
        const products = await Product.findAll({
            where: {category: req.params.category}
        });

        if (products.length == 0) {
            res.status(404).json({message: `No products for category: ${req.params.category}`});
        } else {
            res.json(products);
        }
    } catch (error) {
        console.error("Error fetching products", error);
        res.status(500).json({ error: "Error fetching products"});
    }
}



module.exports = {
    getAllProducts,
    getProductsByCategory
};

