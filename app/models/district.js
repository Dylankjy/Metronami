const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class District extends Model {}

    District.init(
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
            tableName: 'District',
            modelName: 'District',
        },
    )

    District.associate = (models) => {
        District.hasMany(models.Station, {
            onDelete: 'cascade',
            foreignKey: 'district_id',
        })
    }

    return District
}
