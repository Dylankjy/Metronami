// UUID & Hashing
const uuid = require('uuid')

const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Line extends Model {}

    Line.init(
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: uuid.v4(),
            },
            type: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            alt_name: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            description: {
                allowNull: true,
                type: DataTypes.STRING,
            },
        },

        {
            sequelize,
            tableName: 'Line',
            modelName: 'Line',
        },
    )

    Line.associate = (models) => {
        Line.hasMany(models.Station, {
            onDelete: 'cascade',
            foreignKey: 'line_id',
        })
    }

    return Line
}
