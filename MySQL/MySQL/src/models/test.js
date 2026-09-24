const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnect');


const Test = sequelize.define('test', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'https://via.placeholder.com/150'
    },
    description: {
        type: DataTypes.STRING,
    }
}, {
    timestamps: true
})

module.exports = Test;