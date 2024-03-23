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
    // const item = await ItemModel.findById(itemId);
    const item = await ItemModel.findOne({ itemId });
    res.send(item);
  })
);

router.get(
  '/search/:searchTerm',
  handler(async (req, res) => {
    const { searchTerm } = req.params;
    const searchRegex = new RegExp(searchTerm, 'i');  // case insensitive

    const items = await ItemModel.find({ name: { $regex: searchRegex } });
    res.send(items);
  })
);

router.get(
  '/tag/:tag',
  handler(async (req, res) => {
    const { tag } = req.params;
    const items = await ItemModel.find({ tags: tag });
    res.send(items);
  })
);

router.get(
  '/photoType/:type',
  handler(async (req, res) => {
    const { type } = req.params;
    const items = await ItemModel.find({ photoType: type });
    res.send(items);
  })
);

router.post("/transaction", async (req, res) => {
  const { transactionId, email, firstName, lastName, detail, payment, paymentData, tax, totalPrice, totalCount, reserved} = req.body;

  try {
    const isExist = await TransactionModel.findOne({ transactionId });

    if (isExist) {
      res.status(BAD_REQUEST).send(`transactionId Exists: ${transactionId}`);
      return;
    }

    await TransactionModel.create({
      transactionId: transactionId,
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

// add a item
router.post("/", async (req, res) => {
  const { itemId, name, price, freeDownload, stars, photoType, tags, sizeOptions, thumbnail, preview, imageList, downloadList } = req.body;

  try {
    const isExist = await ItemModel.findOne({ itemId });

    if (isExist) {
      res.status(BAD_REQUEST).send(`itemId Exists: ${itemId}`);
      return;
    }

    await ItemModel.create({
      itemId: itemId,
      name: name,
      price: price,
      freeDownload: freeDownload,
      stars: stars,
      photoType: photoType,
      tags: tags,
      sizeOptions: sizeOptions,
      thumbnail: thumbnail,
      preview: preview,
      imageList: imageList,
      downloadList: downloadList,
    });
    res.status(OK_REQUEST).send("Add a item Successful");
  } catch (error) {
    res.status(SERVER_UNEXPECTED_ERROR).send("Server unexpected error:" + error);
  }
});



export default router;