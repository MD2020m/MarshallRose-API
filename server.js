const express = require('express');
const { getAllProducts, getProductsByCategory,
    createNewProduct, updateProduct, deleteProduct
 } = require('./routes/product-routes');
 const { getAllReviews, createNewReview } = require('./routes/review-routes');
 const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Implement middleware
app.use(cors());
app.use(express.json());

// Product endpoints
app.get('/api/products', getAllProducts);
app.get('/api/products/:category', getProductsByCategory);

app.post('/api/products', createNewProduct);

app.put('/api/products/:productId', updateProduct);

app.delete('/api/products/:productId', deleteProduct);

// Review Routes
app.get('/api/reviews', getAllReviews);

app.post('/api/reviews', createNewReview);


if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port http://localhost:${PORT}`);
    });
}

module.exports = app;