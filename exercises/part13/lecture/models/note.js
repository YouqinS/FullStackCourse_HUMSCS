//create TABLE schema

const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Note extends Model {}

Note.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    important: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE
    },
    //same result as  userId: user.id  in  const note = await Note.create({...req.body, userId: user.id, date: new Date()})
    // userId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: { model: 'users', key: 'id' },
    // }
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'note'
})

module.exports = Note