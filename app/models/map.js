const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Map extends Model {}

    Map.init(
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
            lines_to_show: {
                allowNull: false,
                type: DataTypes.STRING,
                defaultValue: '',
            },
            network_id: {
                allowNull: false,
                type: DataTypes.UUID,
            },
        },

        {
            sequelize,
            tableName: 'Map',
            modelName: 'Map',
        },
    )

    // Map.associate = (models) => {
    //     Map.belongsTo(models.Network, {
    //         onDelete: 'cascade',
    //         foreignKey: 'map_id',
    //     })
    // }

    return Map
}
