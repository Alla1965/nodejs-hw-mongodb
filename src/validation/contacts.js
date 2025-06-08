import Joi from 'joi';
const baseString = Joi.string().min(3).max(20);

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Імʼя повинно бути текстом',
    'string.min': 'Імʼя має містити щонайменше 3 символи',
    'string.max': 'Імʼя не повинно перевищувати 20 символів',
    'any.required': 'Поле "name" обовʼязкове',
  }),

  phoneNumber: Joi.string()
    .pattern(/^\+380\d{9}$/)
    .required()
    .messages({
      'string.pattern.base':
        'Номер телефону повинен бути у форматі +380XXXXXXXXX',
      'any.required': 'Поле "phoneNumber" обовʼязкове',
    }),

  email: Joi.string().email().required().messages({
    'string.email': 'Email повинен бути дійсною адресою',
    'any.required': 'Поле "email" обовʼязкове',
  }),

  isFavourite: Joi.boolean().required().messages({
    'boolean.base': 'Поле "isFavourite" повинно бути true або false',
    'any.required': 'Поле "isFavourite" обовʼязкове',
  }),

  contactType: Joi.string()
    .valid('personal', 'work', 'family', 'other')
    .required()
    .messages({
      'any.only': 'Тип контакту має бути один з: personal, work, family, other',
      'any.required': 'Поле "contactType" обовʼязкове',
    }),

  createdAt: Joi.date().iso().required().messages({
    'date.base': 'Поле "createdAt" повинно бути датою у форматі ISO',
    'any.required': 'Поле "createdAt" обовʼязкове',
  }),

  updatedAt: Joi.date().iso().required().messages({
    'date.base': 'Поле "updatedAt" повинно бути датою у форматі ISO',
    'any.required': 'Поле "updatedAt" обовʼязкове',
  }),
});
export const updateContactSchema = Joi.object({
  name: baseString.optional(),
  phoneNumber: baseString.optional(),
  contactType: baseString.optional().valid('friend', 'family', 'work', 'other'),
}).min(1);
