const Joi = require('@hapi/joi');
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const customerSchema = new Schema({
    openId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    gestation: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    channel: {
        type: String,
        required: true,
    },
    assistant_manager: {
        type: String,
        required: true,
    },
    note: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Customer = mongoose.model('customer', customerSchema)


const schema = Joi.object({
    openId: Joi.string()
        .required(),

    name: Joi.string()
        .required(),

    gestation: Joi.string()
        .required(),
        
    age: Joi.number()
    .required(),

    phone: Joi.number()
        .integer()
        .min(10)
        .max(13),

    address: Joi.string()
        .required(),

    channel:Joi.string()
    .required(),

    assistant_manager: Joi.string()
        .required(),

    note: Joi.string()
        .required(),
})
    // .with('username', 'birth_year')
    // .xor('password', 'access_token')
    // .with('password', 'repeat_password');







exports.Customer = Customer
exports.schema = schema

