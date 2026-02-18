const express = require('express');
const { getAllProducts, getProductsByCategory,
    createNewProduct, updateProduct
 } = require('./routes/product-routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Implement middleware
app.use(express.json());

// Product endpoints
app.get('/api/products', getAllProducts);
app.get('/api/products/:category', getProductsByCategory);

app.post('/api/products', createNewProduct);

app.put('/api/products/:productId', updateProduct);


if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port http://localhost:${PORT}`);
    });
}

module.exports = app;