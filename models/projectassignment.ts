'use strict';
import { Model, UUIDV4 } from "sequelize";
module.exports = (sequelize:any, DataTypes: any) => {
  interface ProjectAssignmentAttributes {
    projectId: number;
    userId: string;
  }

  class ProjectAssignment extends Model<ProjectAssignmentAttributes> implements ProjectAssignmentAttributes {
    projectId!: number;
    userId!: string;

    static associate(models: any) {
      // define association here
      
    }
  };
  ProjectAssignment.init({
    projectId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Projects',
        key: 'projectId'
      }
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'userId'
      }
    },
  }, {
    sequelize,
    modelName: 'ProjectAssignment',
    });
  return ProjectAssignment;
};