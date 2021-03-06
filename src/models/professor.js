const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProfessorSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    classes: [{ type: Schema.Types.ObjectId, ref: 'Class' }],
  },
);

module.exports = mongoose.model('Professor', ProfessorSchema);
