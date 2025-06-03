import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
// import { getAllContacts } from '../services/contacts.js';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  updateContactByIdController,
  deleteContactByIdController,
} from '../controllers/contacts.js';

const router = Router();
console.log('test1');

// router.get('/', ctrlWrapper(getContactsController));
// console.log('test2');
// router.get('/:contactId', ctrlWrapper(getContactByIdController));
// console.log('test3');
router.post('/', ctrlWrapper(createContactController));
console.log('test4');
router.patch('/:contactId', ctrlWrapper(updateContactByIdController));
router.delete('/:contactId', ctrlWrapper(deleteContactByIdController));
export default router;
