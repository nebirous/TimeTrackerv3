'use strict';
import { Model } from 'sequelize';

interface TimeAttributes {
    timeId: number;
    startTime: string;
    endTime: string;
    day: Date;
    // userId: number;
    // projectId: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Time extends Model<TimeAttributes> implements TimeAttributes {
    
    timeId!: number;
    startTime!: string;
    endTime!: string;
    day!: Date;

    static associate(models: any) {
      
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