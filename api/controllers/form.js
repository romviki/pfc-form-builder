// Import models
import Form from '../models/form';

// Form controllers
export const GetForms = async (req, res) => {
  try {
    Form.find({}, (err, form) => {
      if (err) {
        console.log(err);
      }

      res.status(200).json(form);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const GetForm = async (req, res) => {
  const id = req.params.id;

  try {
    Form.findById(id, (err, form) => {
      if (err) {
        console.log(err);
      }

      res.status(200).json(form);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const AddForm = async (req, res) => {
  try {
    const newForm = new Form({
      name: req.body.name,
      fields: req.body.fields,
    });

    Form.create(newForm, (err, form) => {
      if (err) {
        console.error(err);
      }

      res.status(200).json(form);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const EditForm = async (req, res) => {
  const id = req.params.id;
  const updates = {
    name: req.body.name,
    fields: req.body.fields,
    dateUpdated: Date.now(),
  };

  try {
    Form.findByIdAndUpdate(id, updates, { new: true }, (err, form) => {
      if (err) {
        console.error(err);
      }

      res.status(200).json(form);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const DeleteForm = async (req, res) => {
  const id = req.params.id;
  try {
    Form.findByIdAndDelete(id, (err, form) => {
      if (err) {
        console.error(err);
      }

      res.status(200).json(form);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
