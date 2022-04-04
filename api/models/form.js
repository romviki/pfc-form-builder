const mongoose = require('mongoose');
const Schema = mongoose.Schema; // change variable name

const FormSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    fields: [mongoose.Schema.Types.Mixed],
    dateUpdated: {
      type: Date,
      default: Date.now,
    },
    dateCreated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'forms',
  }
);

const Comment = mongoose.model('Form', FormSchema);
module.exports = Comment;
