const { db, Product, Review, User } = require('./setup');
const { Sequelize } = require('sequelize');

async function seedDatabase() {
    try {
        // Force sync to reset database
        await db.sync({ force: true });
        console.log('Database reset successfully.');

        // Create sample products
        const products = await Product.bulkCreate([
            {
                name: 'Work Jacket',
                description: 'A sturdy work jacket built for both form and function. Available in multiple colors and fabrics',
                category: 'outerwear',
                availableFabrics: {fabrics: ['Corduroy', 'Canvas', 'Denim']},
                availableDetails: {details: ['Embroidery','Patterned fabric','Flannel lining','Lined pockets']},
                price: 95.00
            },
            {
                name: 'Summer Dress',
                description: 'Keep cool this summer and through many to come in this light summer dress made to last',
                category: 'dresses',
                availableFabrics: {fabrics: ['Cotton', 'Muslin', 'Linen', 'Silk']},
                availableDetails: {details: ['Embroidery', 'Patterned fabric']},
                price: 70.00
            }
        ]);

        const users = await User.bulkCreate([
            {
                username: 'userNumber1',
                password: 'notHashedYet'
            },
            {
                username: 'userNumberTwo',
                password: 'notHashedYet'
            }
        ]);

        const reviews = await Review.bulkCreate([
            {
                roses: 5,
                productId: products[0].productId,
                userId: users[1].userId
            },
            {
                roses: 5,
                productId: products[1].productId,
                userId: users[0].userId
            }
        ]);

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database: ', error);
    } finally {
        await db.close();
    }
}

if (require.main === module) {
    seedDatabase();
}