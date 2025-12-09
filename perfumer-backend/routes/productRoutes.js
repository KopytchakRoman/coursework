import express from 'express';
import {
  getPerfumes,
  getPerfumeById,
  getBrands,
} from '../controllers/productController.js';

const router = express.Router();

router.get('/perfumes', getPerfumes);
router.get('/perfume/:id', getPerfumeById);

router.get('/brands', getBrands);

export default router;
