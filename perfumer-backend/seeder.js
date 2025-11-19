import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';
import User from './models/userModel.js';
import Perfume from './models/perfumeModel.js';
import Brand from './models/brandModel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
connectDB();

const readDataFromFile = () => {
  try {
    const dbPath = path.join(__dirname, '..', 'db.json');

    if (!fs.existsSync(dbPath)) {
      console.error('Помилка: db.json не знайдено за шляхом:', dbPath);
      return { users: [], perfumes: [], brands: [] };
    }

    const rawData = fs.readFileSync(dbPath, 'utf8');
    const data = JSON.parse(rawData);

    const flattenedBrands = [];
    if (data.brands) {
      for (const letter in data.brands) {
        if (
          Object.prototype.hasOwnProperty.call(data.brands, letter) &&
          Array.isArray(data.brands[letter])
        ) {
          data.brands[letter].forEach((brandName) => {
            flattenedBrands.push({ name: brandName });
          });
        }
      }
    }

    return {
      users: data.users || [],
      perfumes: data.perfumes || [],
      brands: flattenedBrands,
    };
  } catch (error) {
    console.error(`Помилка читання або парсингу db.json: ${error.message} 🛑`);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    const { users, perfumes, brands } = readDataFromFile();

    const userCount = await User.countDocuments();
    if (userCount > 0) {
      console.log('База вже містить користувачів. Імпорт пропущено.');
      return;
    }

    await Perfume.deleteMany();
    await Brand.deleteMany();
    console.log('Старі дані (продукти/бренди) очищені.');

    console.log('Початок імпорту користувачів (з хешуванням)...');
    for (const user of users) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);

      const newUser = new User({
        ...user,
        password: hashedPassword,
      });
      await newUser.save();
    }

    await Perfume.insertMany(perfumes);
    await Brand.insertMany(brands);

    console.log('Дані успішно імпортовані! ✅');
    process.exit();
  } catch (error) {
    console.error(`Помилка імпорту даних: ${error.message} 🛑`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Perfume.deleteMany();
    await Brand.deleteMany();
    console.log('Усі дані успішно очищені! 🗑️');
    process.exit();
  } catch (error) {
    console.error(`Помилка очищення даних: ${error.message} 🛑`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
