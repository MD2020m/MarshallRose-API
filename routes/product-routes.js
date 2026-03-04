const express = require('express');
const { Sequelize } = require('sequelize');
require('dotenv').config();

let db;
let Product;

if (process.env.NODE_ENV == 'test') {
    ({ db, Product } = require('../test_database/test_setup'));
} else {
    ({db, Product} = require('../database/setup'));
}

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

// POST /api/products
// Creates a new product
async function createNewProduct(req, res) {
    try {
        const {name, description, category, price, availableFabrics, availableDetails} = req.body;

        const newProduct = await Product.create({
            name,
            description,
            category,
            availableFabrics,
            availableDetails,
            price
        });

        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error creating product: ', error);
        res.status(500).json({ error: 'Failed to create product' });
    }
}

// PUT /api/products/:productId
// Updates an existing product
async function updateProduct(req, res) {
    try {
        const {name, description, category, availableFabrics, availableDetails} = req.body;
        
        const [updatedRowsCount] = await Product.update(
            {name, description, category, availableFabrics, availableDetails},
            { where: {productId: req.params.productId}}
        );
    
        if (updatedRowsCount === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
    
        const updatedProduct = await Product.findByPk(req.params.productId);
        res.json(updatedProduct);
    } catch (error) {
        console.error('Error updating product: ', error);
        res.status(500).json({ error: 'Failed to update product' });
    }
}

// DELETE /api/products/:productId
// Deletes an existing product
async function deleteProduct(req, res) {
    try {
        const deletedRowsCount = await Product.destroy({
            where: {productId: req.params.productId}
        });

        if (deletedRowsCount === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product: ', error);
        res.status.json({ error: 'Failed to delete product' });
    }
}

module.exports = {
    getAllProducts,
    getProductsByCategory,
    createNewProduct,
    updateProduct,
    deleteProduct
};

