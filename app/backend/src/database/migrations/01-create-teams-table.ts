import { DataTypes, Model, QueryInterface } from 'sequelize';
import { ITeams } from '../../Interfaces/ITeams';

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.createTable<Model<ITeams>>('teams', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      teamName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'team_name',
      },
    });
  },

  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.dropTable('teams');
  },
};