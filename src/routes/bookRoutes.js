import { Router } from 'express';

import {
  listBooks,
  showBook,
  storeBook,
  editBook,
  loanBook,
  giveBackBook,
  removeBook
} from '../controllers/bookController.js';

const router = Router();

router.get('/', listBooks);
router.get('/:id', showBook);

router.post('/', storeBook);

router.put('/:id', editBook);

router.patch('/:id/emprestar', loanBook);
router.patch('/:id/devolver', giveBackBook);

router.delete('/:id', removeBook);

export default router;
