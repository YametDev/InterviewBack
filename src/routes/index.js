const uploadRouter = require("./upload");
const userRouter = require("./user");
const applicationRouter = require("./application");

module.exports = (app) => {
  app.use("/user", userRouter);
  app.use("/application", applicationRouter);
  app.use("/upload_files", uploadRouter);

  app.get("/", (req, res) => {
    res.send("Welcome to GradePost backend server!!!");
  });
};
