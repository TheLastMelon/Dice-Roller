const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Defining a new schema to use for the database
 */
const userSchema = new Schema({
    site_Id: String,
    name: String
});

/**
 * Creating a 'User' model that will be used to find  / add people to the database
 */
const User = mongoose.model('user', userSchema);

/**
 * Making 'User' available externally
 */
module.exports = User;