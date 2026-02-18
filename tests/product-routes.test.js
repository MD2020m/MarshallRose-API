const request = require('supertest');
const app = require('../server');
const { seedDatabase } = require('../test_database/test_seed');

const originalEnv = process.env.NODE_ENV;
beforeEach(() => {
    process.env.NODE_ENV = 'test';
})

afterAll(() => {
    process.env.NODE_ENV = 'development';
    
})

describe('GET /api/products', () => {
    beforeEach(async () => {
        await seedDatabase();
    })

    test('should return all products', async () => {
        const response = await request(app).get('/api/products');

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
    });
});

describe('GET /api/products/:category', () => {
    beforeEach(async () => {
        await seedDatabase();
    })

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

describe('POST /api/products', () => {
    test('should create a new product and return 201 status', async () => {
        const response = await request(app).post('/api/products').send({
            name: 'new shirt',
            description: 'a new shirt for the test',
            category: 'shirts',
            availableFabrics: { fabric: ['cotton', 'flannel']},
            availableDetails: { details: ['embroidery','patterned fabric']}
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('description');
    });

    test('should fail and return 500 response if required fields are null', async () => {
        const response = await request(app).post('/api/products').send({
            description: 'an unnamed product',
            category: 'nothing',
        });

        expect(response.status).toBe(500);
    });
});

describe('PUT /api/products/:productId', () => {
    beforeEach(async () => {
        await seedDatabase();
    });

    test('should return 201 response and updated product', async () => {
        const response = await request(app).put('/api/products/0').send({
            name: 'updated',
            description: 'an updated product',
            category: "doesn't matter what this is",
            availableFabrics: {fabrics: ['cotton', 'denim']},
            availableDetails: {details: ['embroidery']}
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('category');
    });

    test('should return 404 response when productId does not match a product', async () => {
        const response = await request(app).put('/api/products/10000').send({
            name: 'updated',
            description: 'an updated product',
            category: "doesn't matter what this is",
            availableFabrics: {fabrics: ['cotton', 'denim']},
            availableDetails: {details: ['embroidery']}
        });

        expect(response.status).toBe(404);
    });

    test('should return 500 response when invalid data is given', async () => {
        const response = await request(app).purge('api/products/0').send({
            name: null,
            description: null,
            category: null,
            availableFabrics: null,
            availableDetails: null
        });

        expect(response.status).toBe(500);
    })
})




