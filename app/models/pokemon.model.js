module.exports = (sequelize, Sequelize) => {
  const Pokemon = sequelize.define("Pokemon", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });

  return Pokemon;
};
