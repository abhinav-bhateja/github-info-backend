const {Schema} = require('mongoose');
const repoSchema = require('./repo');

const userSchema = new Schema({
    _id: {
        type: String
    },
    name: {
        type: String
    },
    bio: {
        type: String
    },
    avatar_url: {
        type: String
    },
    html_url: {
        type: String
    },
    repos: [repoSchema],
});

module.exports = userSchema;