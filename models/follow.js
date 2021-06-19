'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Follow extends Model {
    /** 
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Follow.belongsTo(models.User, {
        as: 'follower',
        foreignKey: {
          name: 'followerId'
        }
      })
      Follow.belongsTo(models.User, {
        as: 'following',
        foreignKey: {
          name: 'followingId'
        }
      })
    }
  };
  Follow.init({
    followerId: DataTypes.STRING,
    followingId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Follow',
  });
  return Follow;
};