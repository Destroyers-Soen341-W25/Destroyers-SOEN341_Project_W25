//this is a test to pull from the database (its to be reviewed)

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true, unique: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
