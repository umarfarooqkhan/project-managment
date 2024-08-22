import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../src/config/database';

export class Task extends Model {
  public id!: number;
  public name!: string;
  public description?: string;
  public status!: string;
  public projectId!: number;
  public assignedTo?: string | null;
  public createdBy!: string;
  public updatedBy?: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt?: Date;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Open'
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    assignedTo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    updatedBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'Tasks',
  }
);
