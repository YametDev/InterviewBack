const { Application } = require("../models");
const { DateTime } = require("luxon");

module.exports.lookup = (req, res) => {

  const clientStartDate = DateTime.fromFormat(req.body.date, "yyyy-MM-dd").startOf("day");
  const clientEndDate = DateTime.fromFormat(req.body.date, "yyyy-MM-dd").endOf("day");

  // Adjust client date range to UTC using the provided timezone offset
  const startOfDayUTC = clientStartDate.minus({ minutes: req.body.offset }).toJSDate();
  const endOfDayUTC = clientEndDate.minus({ minutes: req.body.offset }).toJSDate();

  const find = req.body.date.length === 0 || req.body.date === '0000-00-00' ? {
    email: req.body?.email,
    company: req.body?.company,
    link: req.body?.link,
    role: req.body?.role,
    state: req.body?.state,
    description: req.body?.description,
  } : {
    email: req.body?.email,
    company: req.body?.company,
    link: req.body?.link,
    role: req.body?.role,
    state: req.body?.state,
    description: req.body?.description,
    createdAt: { $gte: startOfDayUTC, $lte: endOfDayUTC }
  };
  console.log(find);
  Application.countDocuments(find)
    .then((count) => {
      console.log(count);
      Application.find(find)
        .skip(req.body.from)
        .limit(req.body.count)
        .sort({ createdAt: -1 })
        .then((applications) => {
          if (applications) {
            if (applications.length !== 0) {
              console.log(applications[0].createdAt);
            }
            res.send({
              result: true,
              data: applications.map(record => {
                const utcDate = new Date(record.createdAt);
                const localDate = new Date(utcDate.getTime() - req.body.offset * 60000);
                return {
                  ...record.toObject(),
                  createdAt: localDate.toISOString().split("T")[0]
                }
              }),
              count
            });
          } else {
            res.send({ result: false, message: "Applications not found." });
          }
        })
        .catch((error) =>
          res.send({ result: false, message: "Error :" + error })
        );
    })
    .catch((error) => res.send({ result: false, message: "Error :" + error }));
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
