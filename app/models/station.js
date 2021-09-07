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
        },

        {
            sequelize,
            tableName: 'Station',
            modelName: 'Station',
        },
    )

    return Station
}
