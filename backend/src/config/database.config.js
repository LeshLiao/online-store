import { connect, set } from 'mongoose';
import { UserModel } from '../models/user.model.js';
import { ItemModel } from '../models/item.model.js';
import { sample_users } from '../test/data.js';
import { sample_foods } from '../test/data.js';
import bcrypt from 'bcryptjs';
const PASSWORD_HASH_SALT_ROUNDS = 10;
set('strictQuery', true);

export const dbconnect = async () => {
  try {
    connect(process.env.MONGO_URI_ONLINE_STORE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // await seedUsers();
    // await seedFoods();
    await initItems();
    console.log('--- MongoDB connect successfully!');
  } catch (error) {
    console.log(error);
  }
};

async function seedUsers() {
  const usersCount = await UserModel.countDocuments();
  if (usersCount > 0) {
    console.log('--- Users seed is already done!');
    return;
  }

  for (let user of sample_users) {
    user.password = await bcrypt.hash(user.password, PASSWORD_HASH_SALT_ROUNDS);
    await UserModel.create(user);
  }

  console.log('--- Users seed is done!');
}

async function initItems() {
  let importMockData = false;

  let rawData;
  if (importMockData) {
    const module = await import('../test/private/OnlineStoreRawData/static.js');

    rawData = module.getStaticItems;

    const items = await ItemModel.countDocuments();
    if (items > 0) {
      console.log('--- Item already exists!');
      return;
    }


    for (const item of rawData) {
      await ItemModel.create(item);
    }
    console.log('--- Adding new items is done!');
  }
}