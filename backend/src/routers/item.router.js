import { Router } from 'express';
import { ItemModel } from '../models/item.model.js';
import { TransactionModel } from '../models/transaction.model.js';
import { BAD_REQUEST, OK_REQUEST, SERVER_UNEXPECTED_ERROR } from '../constants/httpStatus.js';
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

router.post("/transaction", async (req, res) => {
  const { orderId, email, firstName, lastName, detail, payment, paymentData, tax, totalPrice, totalCount, reserved} = req.body;

  try {
    const isExist = await TransactionModel.findOne({ orderId });

    if (isExist) {
      res.status(BAD_REQUEST).send(`orderId Exists: ${orderId}`);
      return;
    }

    await TransactionModel.create({
      orderId: orderId,
      email: email,
      firstName: firstName,
      lastName: lastName,
      detail: detail,
      payment: payment,
      paymentData: paymentData,
      tax: tax,
      totalPrice: totalPrice,
      totalCount: totalCount,
      reserved: reserved,
  });
    res.status(OK_REQUEST).send("Add transaction Successful");
  } catch (error) {
    res.status(SERVER_UNEXPECTED_ERROR).send("Server unexpected error:" + error);
  }
});

export default router;