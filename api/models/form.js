import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const FormSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    fields: [Schema.Types.Mixed],
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

const Model = mongoose.model('Form', FormSchema);
export default Model;
