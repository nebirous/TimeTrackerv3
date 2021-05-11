'use strict';
import { Model, ModelStatic, UUIDV4 } from 'sequelize';

interface UserAttributes {
  userId: string;
  name: string;
  email: string;
  password: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    
    userId!: string;
    name!: string;
    email!: string;
    password!: string;

    static associate(models: any) {
      // define association here
      User.belongsToMany(models.Project, {
        through: 'ProjectAssignments'
      });

      User.hasMany(models.Times, {
        sourceKey: 'id',
        foreignKey: 'timeId',
        as: 'timeId'
      });
    }
  };
  User.init({
    userId: { 
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
    });
  return User;
};