import { Request, Response } from 'express';
import userModel from '../models/user.model';


export const getUserById = async (req: Request, res: Response) => {

  const { id } = req.params;

  try {

    const user = await userModel.findOne({ chatId: +id });

    if (!user) {
      res.status(404).send({ message: 'User not found' });
      return;
    }

    res.send({ user });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Internal server error' });
  }
};


export const createUser = async (req: Request, res: Response) => {
  let { chatId, lastName, firstName, avatarUrl, modelUrl, rpmId } = req.body;

  try {
    const user = await userModel.findOne({ chatId: chatId });
    if (user) {
      res.status(400).send({ message: 'User already exists' });
      return;
    }

    //https://models.readyplayer.me/672b3f58edf777e52bdcdf45.glb
    if (!modelUrl && rpmId) {
      modelUrl = `https://models.readyplayer.me/${rpmId}.glb`
    }

    if (!avatarUrl && rpmId) {
      avatarUrl = `https://models.readyplayer.me/${rpmId}.png?scene=fullbody-portrait-closeupfront;`
    }

    const newUser = await userModel.create({
      chatId,
      lastName,
      firstName,
      avatarUrl,
      modelUrl,
      rpmId
    });

    res.status(201).send({ user: newUser })
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Internal server error' });
  }
}