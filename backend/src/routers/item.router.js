import { Router } from 'express';
import { ItemModel } from '../models/item.model.js';
import handler from 'express-async-handler';

const router = Router();

router.get(
  '/',
  handler(async (req, res) => {
    const items = await ItemModel.find({});
    res.send(items);
  })
);

router.get(
  '/:itemId',
  handler(async (req, res) => {
    const { itemId } = req.params;
    const item = await ItemModel.findById(itemId);
    res.send(item);
  })
);

router.get(
  '/search/:searchTerm',
  handler(async (req, res) => {
    const { searchTerm } = req.params;
    const searchRegex = new RegExp(searchTerm, 'i');  // case insensitive

    const foods = await FoodModel.find({ name: { $regex: searchRegex } });
    res.send(foods);
  })
);

router.get(
  '/tag/:tag',
  handler(async (req, res) => {
    const { tag } = req.params;
    const foods = await FoodModel.find({ tags: tag });
    res.send(foods);
  })
);

export default router;