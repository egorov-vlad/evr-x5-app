import { Joi, Segments, celebrate } from 'celebrate';

export const validateGetUser = celebrate({
  [Segments.PARAMS]: {
    id: Joi.number().required(),
  },
});


export const validateCreateUser = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    chatId: Joi.number().required(),
    lastName: Joi.string().optional(),
    firstName: Joi.string().optional(),
    avatarUrl: Joi.string().optional(),
    modelUrl: Joi.string().optional(),
    rpmId: Joi.string().required(),
  },
})