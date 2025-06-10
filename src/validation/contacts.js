import Joi from 'joi';
const str = Joi.string().min(3).max(20).messages({
  'string.min': 'має бути мінімум 3 символи',
  'string.max': 'не більше 20 символів',
});

export const createContactSchema = Joi.object({
  name: str.required().messages({
    'any.required': 'Поле name обов’язкове',
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
    .valid('personal', 'work', 'home')
    .required()
    .messages({
      'any.only': 'Тип контакту має бути один з: personal, work, home',
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
export const updateContactSchema = createContactSchema
  .fork(['name', 'phoneNumber', 'email', 'contactType', 'isFavourite'], (x) =>
    x.optional(),
  )
  .min(1)
  .messages({
    'object.min': 'Повинно бути принаймні одне поле для оновлення',
  });
