'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Project extends sequelize_1.Model {
        static associate(models) {
            // define association here
            this.belongsToMany(models.User, {
                through: 'ProjectAssignments',
                as: 'projects'
            });
            this.hasMany(models.Time, {
                foreignKey: 'timeId',
                as: 'time'
            });
        }
    }
    ;
    Project.init({
        projectId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Project',
    });
    return Project;
};
