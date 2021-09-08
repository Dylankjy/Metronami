const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Line extends Model {}

    Line.init(
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
            },
            type: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            color: {
                allowNull: false,
                type: DataTypes.STRING,
                defaultValue: '#000000',
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
