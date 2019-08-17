module.exports = function(sequelize, DataTypes) {
  var Record = sequelize.define("Record", {
    Artist: {
      type: DataTypes.STRING,
      allownull: false
    },
    Album: {
      type: DataTypes.STRING,
      allownull: false
    },
    Year: DataTypes.STRING,
    WillingToTrade: DataTypes.BOOLEAN,
    // usersId: {
    //   type: DataTypes.INTEGER,
    //   // references: {
    //   // model: User,
    //   // key: "id"
    //   // },
    //   allownull: false
    // }
  });
  
  Record.associate = function(models) {
    Record.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Record;
};
