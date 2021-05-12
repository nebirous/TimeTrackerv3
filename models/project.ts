'use strict';
import { Model, UUIDV4 } from 'sequelize';

interface ProjectAttributes {
  projectId: string;
  title: string;
  description: string;
  status: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Project extends Model<ProjectAttributes> implements ProjectAttributes {
    
    projectId!: string;
    title!: string;
    description!: string ;
    status!: string;

    static associate (models: any) {
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
  };
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