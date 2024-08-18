const mongoose = require('mongoose');

const collectionName = 'users';
const schemaName = 'users';
const SchemaTypes = mongoose.Schema;

const schema = new mongoose.Schema(
    {
        _id: { type: SchemaTypes.ObjectId, auto: true },
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true }, // Added lastName field
        dateStarted: { type: Date, required: true }, // Added dateStarted field
        email: { type: String, required: true, trim: true, unique: true }, // Added email field with unique constraint
        role: { type: String, required: true, trim: true }, // Added role field
        salary: { type: Number, required: true }, // Added salary field
        manager: { type: String, required: true, trim: true }, // Added manager field
    },
    { strict: true, autoCreate: true, timestamps: true } // strict is true to enforce schema
);

const model = mongoose.model(schemaName, schema, collectionName);

module.exports = model;
module.exports.schema = schema;
