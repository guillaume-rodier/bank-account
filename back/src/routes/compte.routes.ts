import { Router } from 'express';
import {
  getAccount,
  doDeposit,
  doWithdraw,
  setLimit,
  doApplyInterest,
} from '../controllers/compte.controller';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.get('/', asyncHandler(getAccount));
router.post('/deposit', asyncHandler(doDeposit));
router.post('/withdraw', asyncHandler(doWithdraw));
router.post('/limit', asyncHandler(setLimit));
router.post('/apply-interest', asyncHandler(doApplyInterest));

export default router;
