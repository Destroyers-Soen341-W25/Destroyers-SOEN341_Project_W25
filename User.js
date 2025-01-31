//this is a test to pull from the database (its to be reviewed)

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true, unique: true },
});
//we need to find a way to include the chat history
const User = mongoose.model('User', userSchema);

module.exports = User;
