const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true }
  }
);

module.exports = mongoose.model("Student", StudentSchema);
