'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class workout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
<<<<<<< HEAD
      models.workout.hasOne(models.user_journal)
      models.workout.hasMany(models.workout_exercise)
      models.workout.belongsTo(models.fave)
=======
>>>>>>> submain
    }
  };
  workout.init({
    date: DataTypes.DATE,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'workout',
  });
  return workout;
};