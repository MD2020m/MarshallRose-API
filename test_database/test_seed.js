const { db, Product, Review, User } = require('./test_setup');
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
                availableDetails: {details: ['Embroidery','Patterned fabric','Flannel lining','Lined pockets']}
            },
            {
                name: 'Summer Dress',
                description: 'Keep cool this summer and through many to come in this light summer dress made to last',
                category: 'dresses',
                availableFabrics: {fabrics: ['Cotton', 'Muslin', 'Linen', 'Silk']},
                availableDetails: {details: ['Embroidery', 'Patterned fabric']}
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
                stars: 5,
                content: 'This is an excellent product. I got mine in brown corduroy with flannel lining on the inside and in the pockets. It has kept me warm for the last five years, I love the way its broken in, and it is clear it is going to last for years to come',
                productId: products[0].productId,
                userId: users[1].userId
            },
            {
                stars: 5,
                content: null,
                productId: products[1].productId,
                userId: users[0].userId
            }
        ]);

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database: ', error);
    }/* finally {
        await db.close();
    }*/
}

if (require.main === module) {
    seedDatabase();
}

module.exports = {seedDatabase};