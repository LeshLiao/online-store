import { Router } from 'express';
import { ItemModel } from '../models/item.model.js';
import { LogModel } from '../models/log.model.js';
import { WaitingModel } from '../models/waiting.model.js';
import { TransactionModel } from '../models/transaction.model.js';
import { BAD_REQUEST, OK_REQUEST, SERVER_UNEXPECTED_ERROR } from '../constants/httpStatus.js';
import handler from 'express-async-handler';
import { generateItemId } from '../utility.js';

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

// Add a new item with auto-generated itemId if empty
router.post('/', async (req, res) => {
  let { itemId, name, price, freeDownload, stars, photoType, tags, sizeOptions, thumbnail, preview, imageList, downloadList } = req.body;

  try {
    // Generate a new itemId if it's empty
    if (!itemId) {
      let isExist = true;
      let retries = 0;
      const maxRetries = 3;

      while (isExist && retries < maxRetries) {
        itemId = generateItemId();
        isExist = await ItemModel.exists({ itemId });
        retries++;
      }

      if (isExist) {
        return res.status(500).send('Failed to generate a unique itemId after 3 attempts.');
      }
    }

    // Create the item in MongoDB
    await ItemModel.create({
      itemId,
      name,
      price,
      freeDownload,
      stars,
      photoType,
      tags,
      sizeOptions,
      thumbnail,
      preview,
      imageList,
      downloadList,
    });

    res.status(200).send(`Add an item successful, itemId=${itemId}`);
  } catch (error) {
    res.status(500).send(`Server unexpected error: ${error}`);
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
          adsLevel: 0
        }
      ;

      res.status(200).json(settings);
    } catch (error) {
      console.error('Error in /settings route:', error);
      res.status(500).send('Internal Server Error');
    }
  })
);

// add a log event
router.post("/log", async (req, res) => {
  const { itemId, eventType, manufacturer, model, release, sdk, country } = req.body;

  try {
    await LogModel.create({
      itemId: itemId,
      eventType: eventType,
      manufacturer: manufacturer,
      model: model,
      release: release,
      sdk: sdk,
      country: country,
    });
    res.status(OK_REQUEST).send("Add a log event Successful_" + itemId);
  } catch (error) {
    res.status(SERVER_UNEXPECTED_ERROR).send("Server unexpected error:" + error);
  }
});

// Add a URL to the waiting list
router.post("/waiting", async (req, res) => {
  const { source, note, url, itemUrl, itemId, priority, assign, status, review } = req.body;

  try {
    // Find the maximum numberId, increments by 1 each time
    const maxItem = await WaitingModel.findOne({}, { numberId: 1 })
      .sort({ numberId: -1 })
      .limit(1);

    let numberId = maxItem ? maxItem.numberId + 1 : 0;

    await WaitingModel.create({
      numberId,
      source,
      note,
      url,
      itemUrl,
      itemId,
      priority,
      assign,
      status,
      review
    });

    res.status(200).send(`Added a URL to the list successfully with numberId: ${numberId}`);
  } catch (error) {
    res.status(500).send(`Server unexpected error: ${error}`);
  }
});

// Get a URL from the waiting list (FIFO)
router.get(
  '/waiting/:assign',
  handler(async (req, res) => {
    const { assign } = req.params;
    try {
      // Find and update the oldest entry with status ''
      const minimumItem = await WaitingModel.findOneAndUpdate(
        { status: '' }, // Filter for items with empty status
        { $set: { status: 'in_process', assign: assign } }, // Update status and assign
        { sort: { numberId: 1 }, new: true } // Sort by numberId ascending, return the updated document
      );

      if (!minimumItem) {
        return res.status(404).send('No waiting items found.');
      }

      res.status(200).json(minimumItem);
    } catch (error) {
      res.status(500).send(`Server unexpected error: ${error}`);
    }
  })
);

// Patch an item to Completed
router.patch(
  '/waiting/:_id',
  handler(async (req, res) => {
    const { _id } = req.params; // Destructure _id from req.params
    const { itemUrl, itemId, priority, assign, status, review } = req.body;

    try {
      // console.log('Patch /waiting route, _id=' + _id);

      // Create an update object with all the fields from req.body
      const updateFields = {};

      // Only include fields that are present in the request body
      if (itemUrl !== undefined) updateFields.itemUrl = itemUrl;
      if (itemId !== undefined) updateFields.itemId = itemId;
      if (priority !== undefined) updateFields.priority = priority;
      if (assign !== undefined) updateFields.assign = assign;
      if (status !== undefined) updateFields.status = status;
      if (review !== undefined) updateFields.review = review;

      // Add a timestamp for when the item was last updated
      updateFields.updatedAt = new Date();

      // Find the item by _id and update its fields
      const item = await WaitingModel.findByIdAndUpdate(
        _id, // The document's _id
        { $set: updateFields }, // Update operation with all fields
        { new: true } // Return the updated document
      );

      if (!item) {
        // If no item is found, send a 404 response
        return res.status(404).send(`Item with _id: ${_id} not found.`);
      }

      // Send the updated item as the response
      res.status(200).json(item);
    } catch (error) {
      // Log the error for debugging
      console.error('Error updating waiting item:', error);

      // Handle specific MongoDB errors
      if (error.name === 'CastError') {
        return res.status(400).send(`Invalid item ID format: ${_id}`);
      }

      // Handle any other errors that occur during the operation
      res.status(500).send(`Server unexpected error: ${error.message}`);
    }
  })
);

export default router;