import Joi from 'joi';

const str = Joi.string().min(3).max(20).messages({
  'string.min': 'має бути мінімум 3 символи',
  'string.max': 'не більше 20 символів',
});

export const createContactSchema = Joi.object({
  name: Joi.string().required(),
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
    'any.empty': 'Поле "email" обовʼязкове',
  }),
  isFavourite: Joi.boolean().required().messages({
    'boolean.base': 'Поле "isFavourite" повинно бути true або false',
    'any.required': 'Поле "isFavourite" обовʼязкове',
  }),
  contactType: Joi.string()
    .valid('personal', 'work', 'home')
    .required()
    .messages({
      'any.only': 'Тип контакту має бути один з: personal, work, home',
      'any.required': 'Поле "contactType" обовʼязкове',
    }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string(),
  phoneNumber: Joi.string()
    .pattern(/^\+380\d{9}$/)
    .optional()
    .messages({
      'string.pattern.base':
        'Номер телефону повинен бути у форматі +380XXXXXXXXX',
    }),
  email: Joi.string().email().optional().messages({
    'string.email': 'Email повинен бути дійсною адресою',
  }),
  isFavourite: Joi.boolean().optional().messages({
    'boolean.base': 'Поле isFavourite повинно бути true або false',
  }),
  contactType: Joi.string()
    .valid('personal', 'work', 'home')
    .optional()
    .messages({
      'any.only': 'Тип контакту має бути один з: personal, work, home',
    }),
})
  .min(1)
  .messages({
    'object.min': 'Мінімум одне поле обовʼязкове для оновлення',
  });
