const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Connection extends Model {}

    Connection.init(
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
            },
        },

        {
            sequelize,
            tableName: 'Connection',
            modelName: 'Connection',
        },
    )
    Connection.associate = (models) => {
        Connection.hasMany(models.Station, {
            onDelete: 'cascade',
            foreignKey: 'connection_id',
        })
    }

    return Connection
}
