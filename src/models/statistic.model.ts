import { model, Schema } from 'mongoose';

export enum Action {
  LIKE = 'like',
  LOVE = 'love',
  APPLAUSE = 'applause',
  CLOUDTAG = 'cloudtag',
  POLL = 'poll',
  FINAL = 'final'
}

interface IStatistic {
  actionName: Action;
  chatId: number;
  actionValue?: string;
  lobbyId: number;
}


const statisticSchema = new Schema<IStatistic>({
  actionName: {
    type: String,
    required: true,
    enum: Object.values(Action)
  },
  chatId: {
    type: Number,
    required: true
  },
  actionValue: {
    type: String,
    required: false
  },
  lobbyId: {
    type: Number,
    required: false
  }
}, { versionKey: false });


export default model<IStatistic>('statistic', statisticSchema);