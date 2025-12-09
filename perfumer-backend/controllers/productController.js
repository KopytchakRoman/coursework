import Perfume from '../models/perfumeModel.js';
import Brand from '../models/brandModel.js';

export const getPerfumes = async (req, res) => {
  try {
    const perfumes = await Perfume.find({});
    res.json(perfumes);
  } catch (_error) {
    res.status(500).json({ message: _error.message });
  }
};

export const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find({}).sort({ name: 1 });

    const groupedBrands = brands.reduce((acc, brand) => {
      const firstLetter = brand.name.charAt(0).toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(brand.name);
      return acc;
    }, {});

    res.json(groupedBrands);
  } catch (_error) {
    res.status(500).json({ message: _error.message });
  }
};

export const getPerfumeById = async (req, res) => {
  try {
    const perfume = await Perfume.findById(req.params.id);

    if (perfume) {
      res.json(perfume);
    } else {
      res.status(404).json({ message: 'Perfume not found' });
    }
  } catch {
    res.status(404).json({ message: 'Invalid product ID' });
  }
};
