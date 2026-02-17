const request = require('supertest');
const app = require('../server');



describe('GET /api/products', () => {
    
    test('should return all products', async () => {
        const response = await request(app).get('/api/products');

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
    });
});

describe('GET /api/products/:category', () => {

    test('should return products by category', async () => {
        const outerwearResponse = await request(app).get('/api/products/outerwear');
        const dressesResponse = await request(app).get('/api/products/dresses');

        expect(outerwearResponse.status).toBe(200);
        expect(outerwearResponse.body.length).toBe(1);

        expect(dressesResponse.status).toBe(200);
        expect(dressesResponse.body.length).toBe(1);
    });

    test('should return 404 response when no products match category', async () => {
        const response = await request(app).get('/api/products/notacategory');

        expect(response.status).toBe(404);
    });
});




