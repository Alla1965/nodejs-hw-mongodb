import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { ROLES } from '../constants/index.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  updateContactByIdController,
  deleteContactByIdController,
} from '../controllers/contacts.js';
//import { upload } from '../middlewares/multer.js';
import { upload } from '../utils/cloudinary.js';
import { checkRoles } from '../middlewares/checkRoles.js';

const router = Router();
router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));

router.post(
  '/',
  checkRoles('TEACHER'),
  upload.single('photo'),
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);
router.put(
  '/:contactId',
  checkRoles(ROLES.TEACHER),
  isValidId,
  upload.single('photo'), // додаємо цю middleware
  validateBody(createContactSchema),
  ctrlWrapper(updateContactByIdController),
);
router.patch(
  '/:contactId',
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  isValidId,
  upload.single('photo'),
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactByIdController),
);
router.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(deleteContactByIdController),
);
export default router;
