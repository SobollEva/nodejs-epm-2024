import * as Joi from '@hapi/joi';

export const schemaCreateUser: Joi.ObjectSchema<unknown> = Joi.object().keys({
    login: Joi.string().email().required(),
    password: Joi.string().regex(/^(?:\d+\w|\w+\d)[\w\d]+$/).required(),
    age: Joi.number().min(4).max(130).required()
});

export const schemaUpdateUser: Joi.ObjectSchema<unknown> = Joi.object().keys({
    login: Joi.string().email(),
    password: Joi.string().regex(/^(?:\d+\w|\w+\d)[\w\d]+$/),
    age: Joi.number().min(4).max(130),
    isDeleted: Joi.boolean()
});
