const { User } = require("../models");

module.exports.lookup = (req, res) => {
  const find = req.body;
  User.countDocuments(find).then((count) => {
    User.find(find)
      .then((users) => {
        if (users) {
          res.send({ result: true, data: users, count });
        } else {
          res.send({ result: false, message: "Users not found." });
        }
      })
      .catch((error) =>
        res.send({ result: false, message: "Error :" + error })
      );
  });
};

module.exports.create = (req, res) => {
  const newUser = new User(req.body);
  newUser
    .save()
    .then((record) => {
      res.send({ result: true, data: record });
    })
    .catch((error) => {
      res.send({
        result: false,
        message: "Error : " + error,
      });
    });
};

module.exports.update = (req, res) => {
  User.findOneAndUpdate(req.body.find, req.body.update)
    .then((user) => {
      res.send({ result: true, data: user });
    })
    .catch((error) => res.send({ result: false, message: "Error : " + error }));
};

module.exports.delete = (req, res) => {
  User.deleteOne(req.body)
    .then((user) => {
      res.send({ result: true, data: user });
    })
    .catch((error) => res.send({ result: false, message: "Error : " + error }));
};
