const { application } = require("express");
const { Application } = require("../models");

module.exports.lookup = (req, res) => {
  const find = {
    company: req.body?.company,
    role: req.body?.role,
    state: req.body?.state,
    // description: req.body?.description,
  };
  Application.countDocuments(find).then((count) => {
    console.log(count);
    Application.find(find)
      .skip(req.body.from)
      .limit(req.body.count)
      .sort({ votes: 1, views: 1, createdAt: -1 })
      .then((applications) => {
        if (applications) {
          res.send({ result: true, data: applications, count });
        } else {
          res.send({ result: false, message: "Applications not found." });
        }
      })
      .catch((error) =>
        res.send({ result: false, message: "Error :" + error })
      );
  });
};

module.exports.create = (req, res) => {
  const newApplication = new Application(req.body);
  newApplication
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
  Application.findOneAndUpdate(req.body.find, req.body.update)
    .then((application) => {
      res.send({ result: true, data: application });
    })
    .catch((error) => res.send({ result: false, message: "Error : " + error }));
};

module.exports.delete = (req, res) => {
  Application.deleteOne(req.body)
    .then((application) => {
      res.send({ result: true, data: application });
    })
    .catch((error) => res.send({ result: false, message: "Error : " + error }));
};

module.exports.deleteMany = (req, res) => {
  return {};
};
