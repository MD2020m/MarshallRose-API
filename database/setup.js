const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

console.log(process.env.DB_TYPE);

const db = new Sequelize({
    dialect: process.env.DB_TYPE,
    storage: `database/${process.env.DB_NAME}` || 'database/marshall_rose.db',
    logging: false
});

// Product model
const Product = db.define('Product', {
    productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    availableFabrics: {
        type: DataTypes.JSON,
        allowNull: false
    },
    availableDetails: {
        type: DataTypes.JSON,
        allowNull: false
    }
});

const Review = db.define('Review', {
    reviewId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    stars: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

const User = db.define('User', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Product.hasMany(Review, {foreignKey: 'productId', as: 'prodId'});
Review.belongsTo(Product, {foreignKey: 'productId', as: 'prodId'});

User.hasMany(Review, {foreignKey: 'userId', as: 'reviewerId'});
Review.belongsTo(User, {foreignKey: 'userId', as: 'reviewerId'});

// Initialize database
async function initializeDatabase() {
    try {
        await db.authenticate();
        console.log('Database connection established successfully.');

        await db.sync({ force: false });
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to database:', error);
    }
}

if (require.main === module) {
    initializeDatabase();
}

module.exports = {
    db,
    Product,
    Review,
    User
};
