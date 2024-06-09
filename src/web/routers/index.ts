import express from 'express';
import driver from "./driver";

const router = express.Router();

router.use('/drivers', driver);

export default router;
