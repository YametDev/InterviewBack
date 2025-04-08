const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const userSchema = new mongoose.Schema(
  {
    userId: { type: Number, default: 0 },
    parent: String,
    name: String,
    email: String,
  },
  { timestamps: true }
);

userSchema.plugin(AutoIncrement, { inc_field: 'userId' });

const User = mongoose.model("user", userSchema);

module.exports = User;
