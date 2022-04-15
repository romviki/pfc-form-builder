
import {
  GetForm,
  AddForm,
  EditForm,
  DeleteForm
} from '../controllers/form';
import express from 'express';
const router = express.Router();

// import form controllers
router.get('/:id', GetForm);
router.post('/', AddForm);
router.put('/:id', EditForm);
router.delete('/:id', DeleteForm);

export default router;
