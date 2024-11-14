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

    if (!modelUrl && rpmId) {
      modelUrl = `https://models.readyplayer.me/${rpmId}.glb`
    }

    if (!avatarUrl && rpmId) {
      avatarUrl = `https://models.readyplayer.me/${rpmId}.png?scene=fullbody-portrait-closeupfront`
    }

    if (user) {
      await userModel.updateOne({ chatId: chatId }, {
        lastName: lastName || user.lastName,
        firstName: firstName || user.firstName,
        avatarUrl: avatarUrl || user.avatarUrl,
        modelUrl: modelUrl || user.modelUrl,
        rpmId: rpmId || user.rpmId 
      }, { runValidators: true });

      res.send({ user });
      return;
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
    if (err instanceof Error && err.message.includes('E11000')) {
      res.status(409).send({ message: 'User already exists' });
      return;
    }
    console.log(err);
    res.status(500).send({ message: 'Internal server error' });
  }
}