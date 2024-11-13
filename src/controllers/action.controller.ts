import { Request, Response } from 'express';
import statisticModel from '../models/statistic.model';
import userModel from '../models/user.model';
import { sendMessageToSocket } from '../utils/socket';

export const addNewAction = async (req: Request, res: Response) => {

  const { chatId, actionName, actionValue, lobbyId } = req.body;

  try {
    const user = await userModel.findOne({ chatId: chatId });

    if (!user) {
      res.status(404).send({ message: 'User not found' });
      return;
    }

    sendMessageToSocket({
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        avatarUrl: user.avatarUrl
      },
      actionName,
      actionValue,
      lobbyId
    });

    await statisticModel.create({
      chatId,
      actionName,
      actionValue,
      lobbyId
    });

    res.send({ message: 'Action added' });
  } catch (err) {
    console.log(err);

    res.status(500).send({ message: 'Internal server error' });
  }
};