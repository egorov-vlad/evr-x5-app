import { Joi, Segments, celebrate } from 'celebrate';
import { Action } from '../models/statistic.model';

export const validateGetUser = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().required(),
  },
});

export const validateCreateUser = celebrate({
  [Segments.BODY]: {
    chatId: Joi.number().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().optional(),
    avatarUrl: Joi.string().optional(),
    modelUrl: Joi.string().optional(),
    rpmId: Joi.string().required(),
  },
});

export const validateAction = celebrate({
  [Segments.BODY]: {
    chatId: Joi.number().required(),
    actionName: Joi.string().valid(...Object.values(Action)).required(),
    actionValue: Joi.string().optional(),
    lobbyId: Joi.number().required()
  },
});