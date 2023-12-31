import { PROPERTY_TYPES } from '@prisma/client';
import Joi from 'joi';

const propertySchema = Joi.object({
  
  property_title: Joi.string().required(),
  property_type: Joi.string().valid(...Object.values(PROPERTY_TYPES)).required(),
  structure: Joi.string().required(),
  listing_type: Joi.string().required(),
  style: Joi.string().required(),
  view: Joi.string().required(),
  utility_payment: Joi.string().required(),
  year_built: Joi.string().required(),
  pets_allowed: Joi.string().required(),
  available: Joi.string().required(),
  sale_or_rent_price: Joi.string().required(),
  price_prefix: Joi.string().required(),
  payment_frequency: Joi.string().required(),
  payment_plan: Joi.string().required(),
  langitude: Joi.number().required(),
  latitude: Joi.number().required(),
  country: Joi.string().required(),
  street_Number: Joi.string().required(),
  locality: Joi.string().required(),
  postal_code: Joi.string().required(),
  logistics: Joi.string().required(),
  parking_lot: Joi.string().required(),
  parking_slots: Joi.string().required(),
  fire_place: Joi.string().required(),
  entry_floor: Joi.string().required(),
  room_list: Joi.string().required(),
  bedroom: Joi.string().required(),
  bathroom: Joi.string().required(),
  pool: Joi.string().required(),
  building_unit: Joi.string().required(),
  unit_amenities: Joi.array().items(Joi.string()).required(),
  specification: Joi.string().required(),
  //images: Joi.array().items(Joi.string()).required(),
  video_url: Joi.string().required(),
  video_url_tour: Joi.string().required(),
  utilities: Joi.array().items(Joi.string()).required(),
  date_posted: Joi.string().required(),
  property_price: Joi.string().required(),
  total_lessee: Joi.string().required(),
  permit: Joi.string().required(),
  description: Joi.string().required(),
  additional_details: Joi.string().required(),
  additional_facilities_and_amenities: Joi.string().required(),
  proximate_landmark: Joi.string().required(),
  
  
});

export default propertySchema;
