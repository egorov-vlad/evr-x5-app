import { Joi, Segments, celebrate } from 'celebrate';

export const validateGetUser = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().required(),
  },
});


export const validateCreateUser = celebrate({
  [Segments.BODY]: {
    chatId: Joi.number().required(),
    lastName: Joi.string().required(),
    firstName: Joi.string().required(),
    avatarUrl: Joi.string().optional(),
    modelUrl: Joi.string().optional(),
    rpmId: Joi.string().required(),
  },
})