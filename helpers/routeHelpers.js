const Joi = require('joi');

module.exports = {
  validateBody: (schema) => {

  },

  schemas: {
    authSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })
  }
}