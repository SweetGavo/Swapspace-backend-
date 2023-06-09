const Joi = require('joi');

const createTaskSchema = Joi.object({
  title: Joi.string().required(),
  action: Joi.string().required(),
  assignee: Joi.string().optional(),
  collaborator: Joi.string().optional(),
  contact: Joi.array().items(Joi.string()).optional(),
  description: Joi.string(),
  start_date: Joi.date().required(),
  due_date_and_time: Joi.date().required(),
  closing_date_and_time: Joi.date().required(),
  realtorId: Joi.string().required(),
});

export default createTaskSchema;

// TODO:
