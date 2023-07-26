import User from "../model/user.js";
import Token from "../model/token.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// signup api
export const signupUser = async (request, response) => {
  try {
    const hashedPassword = await bcrypt.hash(request?.body?.password, 10);
    const dataFromClientSide = {
      name: request.body.name,
      username: request.body.username,
      password: hashedPassword,
    };
    const newUser = new User(dataFromClientSide);
    await newUser.save();
    return response.status(200).json({ message: `Signup successfull` });
  } catch (err) {
    return response
      .status(500)
      .json({ message: `Error while signup the user` });
  }
};

// login api
export const loginUser = async (request, response) => {
  let user = await User.findOne({ username: request.body.username });
  if (!user) {
    return response.status(400).json({ message: `Username doesn't match` });
  }
  try {
    let match = await bcrypt.compare(request.body.password, user.password);
    if (match) {
      const accessToken = jwt.sign(
        user.toJSON(),
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: "15m" }
      );
      const refreshToken = jwt.sign(
        user.toJSON(),
        process.env.REFRESH_SECRET_KEY,
        { expiresIn: "15m" }
      );
      const newToken = new Token({ token: refreshToken });
      await newToken.save();
      return response.status(200).json({
        accessToken: accessToken,
        refreshToken: refreshToken,
        name: user.name,
        username: user.username,
      });
    } else {
      return response.status(400).json({ message: `Password doesn't match` });
    }
  } catch (err) {
    return response.status(500).json({ message: `Error while login user` })
  }
};
