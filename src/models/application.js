const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const applicationSchema = new mongoose.Schema(
  {
    id: { type: Number, default: 0 },
    link: String,
    company: String,
    role: String,
    salary: String,
    description: String,
    state: { type: Number, default: 0 },
    pin: { type: Boolean, default: false }
  },
  { timestamps: true }
);

applicationSchema.plugin(AutoIncrement, { inc_field: 'id' });

const Application = mongoose.model("application", applicationSchema);

module.exports = Application;
