import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import statisticModel from '../models/statistic.model';
import userModel from '../models/user.model';

import { sendMessageToSocket } from '../utils/socket';
import { API_KEY } from '../config';

export const addNewAction = async (req: Request, res: Response) => {

  const { chatId, actionName, actionValue, lobbyId } = req.body;

  try {
    const user = await userModel.findOne({ chatId: chatId });

    // if (!user) {
    //   res.status(404).send({ message: 'User not found' });
    //   return;
    // }

    sendMessageToSocket({
      user: {
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        userId: chatId,
        rpmId: user?.rpmId || '',
        avatarUrl: user?.avatarUrl || ''
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


export const saveStatisticsToFile = async (req: Request, res: Response) => {
  try {
    const statistics = await statisticModel.find();

    if (!statistics.length) {
      res.status(404).send({ message: 'Statistics not found' });
      return;
    }

    fs.writeFileSync(path.resolve(__dirname, '../../statistics.json'), JSON.stringify(statistics));

    res.send({ message: 'Statistics saved' });
  }
  catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Internal server error' });
  }
}

export const clearStatistics = async (req: Request, res: Response) => {
  try {
    if (req.headers['x-api-key'] !== API_KEY) {
      res.status(401).send({ message: 'Unauthorized' });
      return;
    }

    await statisticModel.deleteMany({});
    res.send({ message: 'Statistics cleared' });
  }
  catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Internal server error' });
  }
}