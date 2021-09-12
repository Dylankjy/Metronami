const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Station extends Model {}

    Station.init(
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
            },
            station_code: {
                allowNull: false,
                primaryKey: true,
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
        },

        {
            sequelize,
            tableName: 'Station',
            modelName: 'Station',
        },
    )

    Station.associate = (models) => {
        Station.belongsTo(models.Line, {
            onDelete: 'cascade',
            foreignKey: 'line_id',
        })
        Station.belongsTo(models.Connection, {
            onDelete: 'cascade',
            foreignKey: 'connection_id',
        })
    }

    return Station
}
