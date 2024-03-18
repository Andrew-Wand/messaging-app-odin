const db = require("../models");

Message = db.message;

exports.sendMessage = async (req, res) => {
  const message = await Message.create({
    text: req.body.text,
    owner: req.body.owner,
    receiver: req.body.receiver,
  }).catch((error) => {
    error.statusCode = 400;
    next(error);
  });

  return res.send(message);
};
