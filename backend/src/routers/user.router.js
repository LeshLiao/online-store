import { Router } from 'express'
import jwt from 'jsonwebtoken';
import { BAD_REQUEST, OK_REQUEST, SERVER_UNEXPECTED_ERROR } from '../constants/httpStatus.js';
import handler from 'express-async-handler';
import { UserModel } from '../models/user.model.js';
import { TokenModel } from '../models/token.model.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const router = Router();

router.post(
  '/login',
  handler(async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    console.log('backend login');
    if (!user) {
      console.log('invalid email');
      return res.status(401).send({ message: "Invalid Email" });
    }


    if (!(await bcrypt.compare(password, user.password)))
      return res.status(401).send({ message: "Invalid Password" });

    if (!user.verified) {
      let verifiedToken = await TokenModel.findOne({ userId: user._id });
      if (!verifiedToken) {
        verifiedToken = await TokenModel.create({
          email: email,
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex"),
        });
      }

      return res.status(OK_REQUEST).send({
        message: "We have sent a verification link to your email\nPlease verify your email address\n" + email,
        uid: user._id,
        firstName: user.firstName,
        email: user.email,
        token: verifiedToken.token,
        needVerified: true
      });
    }

    const userToken = generateTokenResponse(user);
		return res.status(OK_REQUEST).send({ loginSucceed: true, token: userToken, message: "logged in successfully" });
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

    let newUser = await UserModel.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: encryptedPassword
    });

    // await TokenModel.deleteOne({ email });  // delete old token if it's existed

    const token = await TokenModel.create({
      email: email,
      userId: newUser._id,
      token: crypto.randomBytes(32).toString("hex"),
    });

    res.status(OK_REQUEST).send({
      message: "We have sent a verification link to your email\nPlease verify your email address\n" + email,
      uid: newUser._id,
      token: token.token
    });

  } catch (error) {
    res.status(SERVER_UNEXPECTED_ERROR).send("Server unexpected error:" + error);
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
    lastName: user.lastName,
    address: user.address,
    isAdmin: user.isAdmin,
    token,
  };
};

router.get("/:id/verify/:token", async (req, res) => {

  try {
		const user = await UserModel.findOne({ _id: req.params.id });
		if (!user) {
      return res.status(400).send({ message: "Invalid link" });
    }

    const token = await TokenModel.findOneAndDelete({
      userId: user._id,
      token: req.params.token,
    });

		if (!token) {
      return res.status(400).send({ message: "Invalid link" });
    }

    await UserModel.updateOne({_id:user._id},{$set:{verified:true}});

		res.status(200).send({ message: "Email verified successfully", email: user.email });

  } catch (error) {
    console.log('error:')
    console.log(error)
    res.status(SERVER_UNEXPECTED_ERROR).send("Server unexpected error:(token)" + error);
  }
});

export default router;