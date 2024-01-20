import dotenv from'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors'
import foodRouter from './routers/food.router.js'
import userRouter from './routers/user.router.js'

import { dbconnect } from './config/database.config.js';
dbconnect();

const app = express();
app.use(express.json());

app.use(
  cors({
    credentials:true,
    origin: ["https://food-store-frontend.onrender.com","http://localhost:3000",
    "http://34.86.110.189:3000","https://react-frontend-cloud-run-service-jeeuicbmuq-uc.a.run.app/"],
  })
);
// test 10

app.use('/api/foods', foodRouter);
app.use('/api/users', userRouter);

app.listen(process.env.PORT, () => {
  console.log('listening on PORT:' + process.env.PORT);
})