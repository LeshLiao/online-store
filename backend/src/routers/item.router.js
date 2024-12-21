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

router.get(
  '/catalogs/:name',
  handler(async (req, res) => {
    const { name } = req.params;

    try {
      console.log('Entering /catalogs route, name=' + name);

      const catalogs = [
        {
          id: 0,
          key: "Wallpapers",
          title: "Wallpapers",
          photoUrl: "https://firebasestorage.googleapis.com/v0/b/palettex-37930.appspot.com/o/images%2Flayout%2Fall.jpeg?alt=media&token=d7d90309-c950-40ca-92aa-cbae24e38212",
          width: 80,
          height: 100,
        },
        {
          id: 1,
          key: "Anime",
          title: "Anime",
          photoUrl: "https://firebasestorage.googleapis.com/v0/b/palettex-37930.appspot.com/o/images%2Flayout%2Fanime.jpeg?alt=media&token=93edafa7-273b-481f-9963-14917aa07157",
          width: 80,
          height: 100,
        },
        {
          id: 2,
          key: "City",
          title: "City",
          photoUrl: "https://firebasestorage.googleapis.com/v0/b/palettex-37930.appspot.com/o/images%2Flayout%2Fcity.jpeg?alt=media&token=4f22eee5-ac9d-45b2-963f-dc1a331cc2cc",
          width: 80,
          height: 100,
        },
        {
          id: 3,
          key: "Painting",
          title: "Painting",
          photoUrl: "https://firebasestorage.googleapis.com/v0/b/palettex-37930.appspot.com/o/images%2Flayout%2Fpainting.jpeg?alt=media&token=e3d01014-a0be-45f2-a818-6fbadd3f78af",
          width: 80,
          height: 100,
        },
        {
          id: 4,
          key: "Landscape",
          title: "Landscape",
          photoUrl: "https://fastly.picsum.photos/id/724/300/300.jpg?hmac=yb92HcgCyjUq6a4tVG35Cxb76qXP-xfTu9y3B7a1LQ0",
          width: 80,
          height: 100,
        },
      ];
      res.status(200).json(catalogs);
    } catch (error) {
      console.error('Error in /catalogs route:', error);
      res.status(500).send('Internal Server Error');
    }
  })
);

router.get(
  '/settings/:name',
  handler(async (req, res) => {
    const { name } = req.params;

    try {
      console.log('Entering /settings route, name=' + name);

      const settings =
        {
          version: 1,
          adsLevel: 3
        }
      ;

      res.status(200).json(settings);
    } catch (error) {
      console.error('Error in /settings route:', error);
      res.status(500).send('Internal Server Error');
    }
  })
);

export default router;