import { Router } from 'express'
import jwt from 'jsonwebtoken';
import { BAD_REQUEST, OK_REQUEST } from '../constants/httpStatus.js';
import handler from 'express-async-handler';
import { UserModel } from '../models/user.model.js';
import bcrypt from 'bcryptjs';

const router = Router();

router.post(
  '/login',
  handler(async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.send(generateTokenResponse(user));
      return;
    }

    res.status(BAD_REQUEST).send('Username or password is invalid');
  })
);

router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password} = req.body;

  try {
    const isExist = await UserModel.findOne({ email });

    if (isExist) {
      res.status(BAD_REQUEST).send(`User Exists: ${email}`);
      return;
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    await UserModel.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: encryptedPassword
  });
    res.status(OK_REQUEST).send("Registration Successful!");
  } catch (error) {
    res.status(SERVER_UNEXPECTED_ERROR).send("Server unexpected error!");
  }
});

const generateTokenResponse = user => {

  const token = jwt.sign(
    {
    id: user.id,
    email: user.email,
    isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );

  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    address: user.address,
    isAdmin: user.isAdmin,
    token,
  };
};

export default router;