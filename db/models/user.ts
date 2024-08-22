import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../src/config/database';  // Adjust the path if needed

interface UserAttributes {
  id: number;
  fullName: string;
  email: string;
  password: string;
  createdOn: Date;
  createdBy: string;
  updatedOn: Date;
  updatedBy?: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'createdOn' | 'updatedOn'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public fullName!: string;
  public email!: string;
  public password!: string;
  public createdOn!: Date;
  public createdBy!: string;
  public updatedOn!: Date;
  public updatedBy?: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdOn: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    updatedOn: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'Users',
    timestamps: false,
  }
);

export default User;
