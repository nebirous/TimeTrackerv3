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
      
      this.belongsTo(models.Project, {
        foreignKey: 'projectId',
        as: 'project'
      });

      this.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    }
  };
  Time.init({
    timeId: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
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
