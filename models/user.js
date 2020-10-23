'use strict';
const bcrypt = require('bcrypt')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    // Compares entered password to hashed password
    validPassword(passwordTyped) {
      return bcrypt.compareSync(passwordTyped, this.password);
    };

    // remove the password before serializing
    toJSON() {
      let userData = this.get();
      delete userData.password;
      return userData;
    }
  };

  user.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 99],
          msg: 'Name must be between 1 and 99 characters'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid email address'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8, 99],
          msg: 'Password must be between 8 and 99 characters'
        }
      }
    },
    height: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 99],
          msg: 'Please enter valid height'
        }
      }
    },
    weight: {
      type: DataTypes.INTEGER,
      validate: {
        len: {
          args: [1, 3],
          msg: 'Please enter valid weight'
        }
      }
    },
    gender: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1],
          msg: "M or F"
        }
      }
    },
    age : {
      type: DataTypes.INTEGER,
      validate: {
        len: {
          args: [1, 3],
          msg: 'Please enter your age'
        }
      }
    }
  },
    {
      sequelize,
      modelName: 'user',
    });

  user.beforeCreate((pendingUser, options) => {
    if (pendingUser && pendingUser.password) {
      // hash the password
      let hash = bcrypt.hashSync(pendingUser.password, 12);
      // store the hash as the user's password
      pendingUser.password = hash;
    }
  })

  return user;
};