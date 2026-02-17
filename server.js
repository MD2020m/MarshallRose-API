const express = require('express');
const { getAllProducts, getProductsByCategory } = require('./routes/product-routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Product endpoints
app.get('/api/products', getAllProducts);
app.get('/api/products/:category', getProductsByCategory);


if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port http://localhost:${PORT}`);
    });
}

module.exports = app;