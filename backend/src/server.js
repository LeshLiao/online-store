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


// NOTE: DO NOT add slash / end of your DNS.
// EX:   https://aa.bb.cc/  is not allowed.
// EX:   https://aa.bb.cc   is correct!
app.use(
  cors({
    credentials:true,
    origin: ["https://food-store-frontend.onrender.com","http://localhost:3000",
    "http://34.86.110.189:3000","https://react-frontend-cloud-run-service-jeeuicbmuq-uc.a.run.app",
    "https://online-store-hxxg.onrender.com","https://www.palettex.ca"],
  })
);
// test 10

app.use('/api/foods', foodRouter);
app.use('/api/users', userRouter);

app.listen(process.env.PORT, () => {
  console.log('listening on PORT:' + process.env.PORT);
})