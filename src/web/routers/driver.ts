import express from 'express';
import {
  getDriversByCompany,
  createDriver,
  countDrivers,
} from 'src/web/controllers/api/driver';

const router = express.Router();
router.get('/', getDriversByCompany);
router.post('/', createDriver);
router.post('/_counts', countDrivers);

export default router;
