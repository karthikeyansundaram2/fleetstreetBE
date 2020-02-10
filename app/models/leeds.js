module.exports = function (sequelize, DataTypes) {
    let Leeds = sequelize.define(
      "leeds",
      {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          user_id:{
            type: DataTypes.INTEGER,
            references: {
                model: "users",
                key: "id"
            }
          },
          leed_status:{
              type:DataTypes.ENUM,
              values:['pending','active','completed']
          },
          type:{
            type:DataTypes.ENUM,
            values:['old','new']
        },
          leed_address:{
              type:DataTypes.STRING
          },
          createdAt: { type: DataTypes.DATE, field: "created_at" },
          updatedAt: { type: DataTypes.DATE, field: "updated_at" }
      },
      
      {
        classMethods: {
            associate: function (models) {
                AddMoney.hasMany(models.User, {
                    foreignKey: 'id',
                    onDelete: 'CASCADE'
                });
            }
        }
    }
)
return Leeds;
    }