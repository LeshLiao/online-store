import { Router } from 'express';
import { ItemModel } from '../models/item.model.js';
import { LogModel } from '../models/log.model.js';
import { WaitingModel } from '../models/waiting.model.js';
import { TransactionModel } from '../models/transaction.model.js';
import { BAD_REQUEST, OK_REQUEST, SERVER_UNEXPECTED_ERROR } from '../constants/httpStatus.js';
import handler from 'express-async-handler';
import { generateItemId, initializeFirebase, deleteFileFromStorage } from '../utility.js';

// Initialize Firebase Storage
const storage = initializeFirebase();

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

router.get(
  '/wallpapers/page',
  handler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 30;
    const catalog = req.query.catalog || '';

    try {
      let query = {};

      // Add catalog filter if specified
      // Only checking if catalog matches any tag in the tags array
      if (catalog && catalog !== 'Wallpapers') {
        query = { tags: catalog };  // Only match by tags
      }

      // Get total count for pagination
      const totalItems = await ItemModel.countDocuments(query);

      // Get items for current page
      const items = await ItemModel.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize);

      res.send({
        items,
        currentPage: page,
        totalPages: Math.ceil(totalItems / pageSize),
        totalItems,
        hasMore: page * pageSize < totalItems
      });
    } catch (error) {
      console.error('Error fetching wallpapers:', error);
      res.status(SERVER_UNEXPECTED_ERROR).send({ message: 'Error fetching wallpapers' });
    }
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

    res.status(OK_REQUEST).send(itemId);
  } catch (error) {
    res.status(500).send(`Server unexpected error: ${error}`);
  }
});

// DELETE an item by itemId
router.delete('/:itemId', async (req, res) => {
  const { itemId } = req.params;

  try {
    // Find the item first to get the blob paths
    const item = await ItemModel.findOne({ itemId });

    if (!item) {
      return res.status(404).send(`Item with ID ${itemId} not found.`);
    }

    // Array to track file deletion promises
    const deletePromises = [];

    // Check imageList for files to delete
    if (item.imageList && item.imageList.length > 0) {
      for (const image of item.imageList) {
        // Delete blob if exists
        if (image.blob) {
          deletePromises.push(
            deleteFileFromStorage(image.blob)
              .then(success => {
                if (success) {
                  console.log(`Deleted image: ${image.blob}`);
                }
              })
          );
        }
      }
    }

    // Check downloadList for files to delete
    if (item.downloadList && item.downloadList.length > 0) {
      for (const download of item.downloadList) {
        // Delete thumbnail_blob if exists
        if (download.thumbnail_blob) {
          deletePromises.push(
            deleteFileFromStorage(download.thumbnail_blob)
              .then(success => {
                if (success) {
                  console.log(`Deleted thumbnail: ${download.thumbnail_blob}`);
                }
              })
          );
        }

        // Delete upscaled_blob if exists
        if (download.upscaled_blob) {
          deletePromises.push(
            deleteFileFromStorage(download.upscaled_blob)
              .then(success => {
                if (success) {
                  console.log(`Deleted upscaled image: ${download.upscaled_blob}`);
                }
              })
          );
        }
      }
    }

    // Wait for all file deletions to complete
    await Promise.all(deletePromises);

    // Finally, delete the item from MongoDB
    await ItemModel.deleteOne({ itemId });

    res.status(200).send(`Successfully deleted item with ID ${itemId} and its associated files`);
  } catch (error) {
    console.error('Delete item error:', error);
    res.status(500).send(`Server error while deleting item: ${error.message}`);
  }
});

// Patch a specific field of an item
router.patch(
  '/patch_field/:itemId',
  handler(async (req, res) => {
    const { itemId } = req.params;
    const updateData = req.body;

    try {
      // Validate that we have some data to update
      if (!updateData || Object.keys(updateData).length === 0) {
        return res.status(BAD_REQUEST).send('No update data provided');
      }

      // Find the item first to check if it exists
      const existingItem = await ItemModel.findOne({ itemId });

      if (!existingItem) {
        return res.status(404).send(`Item with ID ${itemId} not found`);
      }

      // Update the specified field(s)
      const updatedItem = await ItemModel.findOneAndUpdate(
        { itemId },
        { $set: updateData },
        { new: true } // Return the updated document
      );

      // Log the update operation
      console.log(`Updated field(s) for item ${itemId}:`, Object.keys(updateData));

      res.status(OK_REQUEST).json({
        success: true,
        message: `Successfully updated field(s) for item ${itemId}`,
        updatedItem
      });
    } catch (error) {
      console.error(`Error updating field for item ${itemId}:`, error);

      // Handle specific MongoDB errors
      if (error.name === 'CastError') {
        return res.status(BAD_REQUEST).send(`Invalid item ID format: ${itemId}`);
      }

      res.status(SERVER_UNEXPECTED_ERROR).send(`Server error during update: ${error.message}`);
    }
  })
);


// Wallpaper catalogs
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
          title: "All",
          photoUrl: "https://firebasestorage.googleapis.com/v0/b/palettex-37930.appspot.com/o/images%2Flayout%2Fall.jpeg?alt=media&token=d7d90309-c950-40ca-92aa-cbae24e38212",
          width: 80,
          height: 100,
        },
        {
          id: 1,
          key: "landscape",
          title: "Landscape",
          photoUrl: "https://firebasestorage.googleapis.com/v0/b/palettex-37930.appspot.com/o/images%2Flayout%2Flandscape.jpg?alt=media&token=69f10583-5980-4db0-8aba-8fa1bb68d070",
          width: 80,
          height: 100,
        },
        {
          id: 2,
          key: "nature",
          title: "Nature",
          photoUrl: "https://firebasestorage.googleapis.com/v0/b/palettex-37930.appspot.com/o/images%2Flayout%2Fnature_2.jpeg?alt=media&token=b5bab55e-a626-425a-bbf6-162b58ecd4ca",
          width: 80,
          height: 100,
        },
        {
          id: 3,
          key: "anime",
          title: "Anime",
          photoUrl: "https://firebasestorage.googleapis.com/v0/b/palettex-37930.appspot.com/o/images%2Flayout%2Fanime_3.jpeg?alt=media&token=6dff08a7-65c5-4e23-8976-ac685d8cdd4e",
          width: 80,
          height: 100,
        },
        {
          id: 4,
          key: "space",
          title: "Space",
          photoUrl: "https://firebasestorage.googleapis.com/v0/b/palettex-37930.appspot.com/o/images%2Flayout%2Fspace.jpeg?alt=media&token=f2150e2b-9028-4c2f-8b61-25985c34d3f3",
          width: 80,
          height: 100,
        },
        {
          id: 5,
          key: "minimalistic",
          title: "Simple",
          photoUrl: "https://firebasestorage.googleapis.com/v0/b/palettex-37930.appspot.com/o/images%2Flayout%2Fsimple.jpeg?alt=media&token=3655debf-a744-43e5-8952-bc6d6ffea611",
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
  const { itemId, appVersion, eventType, manufacturer, model, release, sdk, country } = req.body;

  try {
    await LogModel.create({
      itemId: itemId,
      appVersion: appVersion,
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
      // Find and update the entry with highest priority or oldest entry with status ''
      const minimumItem = await WaitingModel.findOneAndUpdate(
        { status: '' }, // Filter for items with empty status
        { $set: { status: 'in_process', assign: assign } }, // Update status and assign
        {
          sort: { priority: -1, numberId: 1 }, // Sort by priority descending (higher number = higher priority), then by numberId ascending
          new: true
        }
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

// Patch an item to redo, Delete image files, and reset waiting list item.
router.patch(
  '/waiting/redo/:_id',
  handler(async (req, res) => {
    const { _id } = req.params;
    console.log(`Redo waiting, _id: ${_id}`);

    try {
      // Find the waiting item by _id
      const waitingItem = await WaitingModel.findById(_id);

      if (!waitingItem) {
        return res.status(404).send(`Waiting item with _id: ${_id} not found.`);
      }

      // Get the itemId from the waiting item
      const { itemId } = waitingItem;

      // Only proceed with deletion if there's an itemId
      if (itemId) {
        // Find the item to get blob paths before deletion
        const item = await ItemModel.findOne({ itemId });

        if (item) {
          // Array to track file deletion promises
          const deletePromises = [];

          // Check imageList for files to delete
          if (item.imageList && item.imageList.length > 0) {
            for (const image of item.imageList) {
              // Delete blob if exists
              if (image.blob) {
                deletePromises.push(
                  deleteFileFromStorage(image.blob)
                    .then(success => {
                      if (success) {
                        console.log(`Deleted image: ${image.blob}`);
                      }
                    })
                );
              }
            }
          }

          // Check downloadList for files to delete
          if (item.downloadList && item.downloadList.length > 0) {
            for (const download of item.downloadList) {
              // Delete thumbnail_blob if exists
              if (download.thumbnail_blob) {
                deletePromises.push(
                  deleteFileFromStorage(download.thumbnail_blob)
                    .then(success => {
                      if (success) {
                        console.log(`Redo: Deleted thumbnail: ${download.thumbnail_blob}`);
                      }
                    })
                );
              }

              // Delete upscaled_blob if exists
              if (download.upscaled_blob) {
                deletePromises.push(
                  deleteFileFromStorage(download.upscaled_blob)
                    .then(success => {
                      if (success) {
                        console.log(`Redo: Deleted upscaled image: ${download.upscaled_blob}`);
                      }
                    })
                );
              }
            }
          }

          // Wait for all file deletions to complete
          await Promise.all(deletePromises);

          // Delete the item from MongoDB
          await ItemModel.deleteOne({ itemId });
          console.log(`Redo: Deleted item with ID ${itemId} from database`);
        } else {
          console.log(`Redo: Item with ID ${itemId} not found in database, only resetting waiting item`);
        }
      }

      // Create update object to reset the waiting item
      const updateFields = {
        itemUrl: "",
        itemId: "",
        priority: 1,
        assign: "",
        status: "",
        review: false,
        updatedAt: new Date()
      };

      // Update the waiting item to reset it for reprocessing
      const updatedWaitingItem = await WaitingModel.findByIdAndUpdate(
        _id,
        { $set: updateFields },
        { new: true }
      );

      res.status(200).json({
        message: `Successfully reset waiting item for reprocessing`,
        waitingItem: updatedWaitingItem
      });
    } catch (error) {
      console.error('Error in redo operation:', error);

      // Handle specific MongoDB errors
      if (error.name === 'CastError') {
        return res.status(400).send(`Invalid item ID format: ${_id}`);
      }

      res.status(500).send(`Server error during redo operation: ${error.message}`);
    }
  })
);

// Patch an item to delete, Delete image files, and delete waiting list item.
router.patch(
  '/waiting/delete/:_id',
  handler(async (req, res) => {
    const { _id } = req.params;
    console.log(`Delete waiting and item, _id: ${_id}`);

    try {
      // Find the waiting item by _id
      const waitingItem = await WaitingModel.findById(_id);

      if (!waitingItem) {
        return res.status(404).send(`Waiting item with _id: ${_id} not found.`);
      }

      // Get the itemId from the waiting item
      const { itemId } = waitingItem;

      // Only proceed with deletion if there's an itemId
      if (itemId) {
        // Find the item to get blob paths before deletion
        const item = await ItemModel.findOne({ itemId });

        if (item) {
          // Array to track file deletion promises
          const deletePromises = [];

          // Check imageList for files to delete
          if (item.imageList && item.imageList.length > 0) {
            for (const image of item.imageList) {
              // Delete blob if exists
              if (image.blob) {
                deletePromises.push(
                  deleteFileFromStorage(image.blob)
                    .then(success => {
                      if (success) {
                        console.log(`Deleted image: ${image.blob}`);
                      }
                    })
                );
              }
            }
          }

          // Check downloadList for files to delete
          if (item.downloadList && item.downloadList.length > 0) {
            for (const download of item.downloadList) {
              // Delete thumbnail_blob if exists
              if (download.thumbnail_blob) {
                deletePromises.push(
                  deleteFileFromStorage(download.thumbnail_blob)
                    .then(success => {
                      if (success) {
                        console.log(`Deleted: Deleted thumbnail: ${download.thumbnail_blob}`);
                      }
                    })
                );
              }

              // Delete upscaled_blob if exists
              if (download.upscaled_blob) {
                deletePromises.push(
                  deleteFileFromStorage(download.upscaled_blob)
                    .then(success => {
                      if (success) {
                        console.log(`Deleted: Deleted upscaled image: ${download.upscaled_blob}`);
                      }
                    })
                );
              }
            }
          }

          // Wait for all file deletions to complete
          await Promise.all(deletePromises);

          // Delete the item from MongoDB
          await ItemModel.deleteOne({ itemId });
          console.log(`Deleted: Deleted item with ID ${itemId} from database`);
        } else {
          console.log(`Deleted: Item with ID ${itemId} not found in database, only resetting waiting item`);
        }
      }


      await WaitingModel.deleteOne({ _id });

      res.status(200).json({
        message: `Successfully delete:${_id}`
      });
    } catch (error) {
      console.error('Error in delete operation:', error);

      // Handle specific MongoDB errors
      if (error.name === 'CastError') {
        return res.status(400).send(`Invalid item ID format: ${_id}`);
      }

      res.status(500).send(`Server error during delete operation: ${error.message}`);
    }
  })
);

// Set review to true
router.patch(
  '/waiting/reviewed/:_id',
  handler(async (req, res) => {
    const { _id } = req.params;
    console.error('review:'+_id);
    try {
      // First, find the item to check if itemId and itemUrl are not empty
      const waitingItem = await WaitingModel.findById(_id);

      if (!waitingItem) {
        return res.status(404).send('No waiting item found.');
      }

      // Check if both itemId and itemUrl are not empty
      if (!waitingItem.itemId || !waitingItem.itemUrl) {
        return res.status(400).send('Cannot mark as reviewed: itemId or itemUrl is missing.');
      }

      // Update the item with review set to true
      const reviewedItem = await WaitingModel.findOneAndUpdate(
        { _id },
        { $set: { review: true } },
        { new: true } // Return the updated document
      );

      res.status(200).json(reviewedItem);

    } catch (error) {
      console.error('Error in review operation:', error);

      // Handle specific MongoDB errors
      if (error.name === 'CastError') {
        return res.status(400).send(`Invalid item ID format: ${_id}`);
      }

      res.status(500).send(`Server error during review operation: ${error.message}`);
    }
  })
);

router.get(
  '/waiting/list/all',
  handler(async (req, res) => {
    console.log("all_waiting_list hi");
    const items = await WaitingModel.find({});
    res.send(items);
  })
);

export default router;