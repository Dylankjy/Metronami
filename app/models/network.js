const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Network extends Model {}

    Network.init(
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
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
            tableName: 'Network',
            modelName: 'Network',
        },
    )

    Network.associate = (models) => {
        Network.hasMany(models.Line, {
            onDelete: 'cascade',
            foreignKey: 'network_id',
        })
        Network.hasMany(models.Station, {
            onDelete: 'cascade',
            foreignKey: 'network_id',
        })
    }

    return Network
}
