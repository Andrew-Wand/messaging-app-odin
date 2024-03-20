const db = require("../models");

const User = db.user;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.userList = async (req, res) => {
  try {
    const response = await User.findAll();
    res.status(200).send(response);

    return response;
  } catch (error) {
    console.log(error);
  }
};

exports.updateProfile = async (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Tutorial update successful!",
        });
      } else {
        res.send({
          message: `Cannot update Tutorial`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating!`,
      });
    });

  // try {
  //   // const response = await User.update(req.body.email, {
  //   //   where: {
  //   //     id: id,
  //   //   },
  //   // });
  //   // res.status(200).send(response);
  //   // return response;

  // } catch (error) {
  //   console.log(error);
  // }
};
