const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  
  const Task = sequelize.define('Task', {
    idn: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    task: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });

  return Task;
};
