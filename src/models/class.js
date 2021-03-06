const mongoose = require('mongoose');

const { Schema } = mongoose;

const ClassSchema = new Schema(
  {
    name: { type: String, required: true },
    professor: { type: Schema.Types.ObjectId, ref: 'Professor', required: true },
  },
);

module.exports = mongoose.model('Class', ClassSchema);
