'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Time extends sequelize_1.Model {
        static associate(models) {
            this.belongsTo(models.Project, {
                foreignKey: 'projectId',
                as: 'project'
            });
            this.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'user'
            });
        }
    }
    ;
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
