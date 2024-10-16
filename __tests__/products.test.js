const request = require('supertest'); // Import the supertest module for HTTP assertions
const app = require('../app'); // Import the app module, which should be the Express app

// Main test suite for Product API
describe('Product API Tests', () => {

    // Test suite for GET /products endpoint
    describe('GET /products', () => {
        it('should return all products', async () => {
            const response = await request(app).get('/products'); // Make a GET request to /products
            expect(response.statusCode).toBe(200); // Expect status code to be 200
            expect(response.body).toBeInstanceOf(Array); // Expect the response body to be an array of products
        });
    });

    // Test suite for GET /products/:id endpoint
    describe('GET /products/:id', () => {
        it('should return a product by ID', async () => {
            const response = await request(app).get('/products/1'); // Make a GET request to /products/1
            expect(response.statusCode).toBe(200); // Expect status code to be 200
            expect(response.body).toHaveProperty('id', 1); // Expect the response body to have an 'id' property with the value 1
        });

        it('should return 404 if product not found', async () => {
            const response = await request(app).get('/products/9999'); // Make a GET request to a non-existent product
            expect(response.statusCode).toBe(404); // Expect status code to be 404
        });
    });

    // Test suite for POST /products endpoint
    describe('POST /products', () => {
        it('should add a new product', async () => {
            const newProduct = {
                name: 'New Product',
                price: 19.99,
                description: 'A newly added product'
            };

            const response = await request(app)
                .post('/products') // Make a POST request to /products
                .send(newProduct); // Send new product data

            expect(response.statusCode).toBe(201); // Expect status code to be 201 (Created)
            expect(response.body).toHaveProperty('id'); // Expect response body to have an 'id' property
            expect(response.body.name).toBe(newProduct.name); // Expect the name in the response to match the new product name
        });
    });

    // Test suite for PUT /products/:id endpoint
    describe('PUT /products/:id', () => {
        it('should update an existing product', async () => {
            const updatedProduct = {
                name: 'Updated Product',
                price: 29.99
            };

            const response = await request(app)
                .put('/products/1') // Make a PUT request to /products/1
                .send(updatedProduct); // Send updated product data

            expect(response.statusCode).toBe(200); // Expect status code to be 200
            expect(response.body.name).toBe(updatedProduct.name); // Expect the name in the response to match the updated product name
        });

        it('should return 404 if product not found', async () => {
            const updatedProduct = {
                name: 'Non-existent Product',
                price: 29.99
            };

            const response = await request(app)
                .put('/products/9999') // Attempt to update a non-existent product
                .send(updatedProduct); // Send updated product data

            expect(response.statusCode).toBe(404); // Expect status code to be 404
        });
    });

    // Test suite for DELETE /products/:id endpoint
    describe('DELETE /products/:id', () => {
        it('should delete a product', async () => {
            const response = await request(app).delete('/products/1'); // Make a DELETE request to /products/1
            expect(response.statusCode).toBe(200); // Expect status code to be 200
        });

        it('should return 404 if product not found', async () => {
            const response = await request(app).delete('/products/9999'); // Attempt to delete a non-existent product
            expect(response.statusCode).toBe(404); // Expect status code to be 404
        });
    });

});

