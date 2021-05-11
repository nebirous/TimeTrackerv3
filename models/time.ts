'use strict';
import { Model } from 'sequelize';

interface TimeAttributes {
    timeId: number;
    startTime: string;
    endTime: string;
    day: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Time extends Model<TimeAttributes> implements TimeAttributes {
    
    timeId!: number;
    startTime!: string;
    endTime!: string;
    day!: Date;

    static associate(models: any) {
      const userId =  Time.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'userTimeId'
      });
      const projectId =  Time.belongsTo(models.Project, {
        foreignKey: 'projectId',
        as: 'projectTimeId'
      });
    }
  };
  Time.init({
    timeId: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        unique: true,
    },
    startTime: {
        allowNull: false,
        type: DataTypes.TEXT,
    },
    endTime: {
        allowNull: false,
        type: DataTypes.TEXT,
    },
    day: {
        allowNull: false,
        type: DataTypes.DATE,
    }
  }, {
    sequelize,
    modelName: 'Time',
    });
  return Time;
};