import {
  GetForms,
  GetForm,
  AddForm,
  EditForm,
  DeleteForm,
} from '../controllers/form';
import express from 'express';
const router = express.Router();

// import form controllers
router.route('/').get(GetForms).post(AddForm);
router.route('/:id').get(GetForm).put(EditForm).delete(DeleteForm);

export default router;
