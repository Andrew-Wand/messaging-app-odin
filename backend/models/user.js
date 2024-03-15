module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    first_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  // User.findByLogin = async (login) => {
  //   let user = await User.findOne({
  //     where: { username: login },
  //   });

  //   if (!user) {
  //     user = await User.findOne({
  //       where: { email: login },
  //     });
  //   }

  //   return user;
  // };

  return User;
};
