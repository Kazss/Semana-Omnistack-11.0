const express = require("express");
const { celebrate, Segments, Joi } = require('celebrate');
const OngController = require("./controllers/OngController");
const IncidentController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

const routes = express.Router();

routes.get("/profile", celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
}), ProfileController.index);

routes.post("/sessions", celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.string().required(),
  })
}), SessionController.create);


routes.get("/ongs", OngController.index);

routes.post("/ongs", celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.number().integer().required().min(1100000000).max(99999999999),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2),
  })
}), OngController.create);


routes.get("/incidents", celebrate({
  [Segments.QUERY]: Joi.object({
    page: Joi.number(),
  })
}), IncidentController.index);

routes.post("/incidents", celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
}), IncidentController.create);

routes.delete("/incidents/:id", celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  }),
  [Segments.HEADERS]: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(),
}), IncidentController.delete);

module.exports = routes;