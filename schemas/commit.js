const mongoose = require('mongoose');

const commitSchema = new mongoose.Schema({
    _id: {
        type: String
    },
    committer: {
        type: String
    },
    message: {
        type: String
    },
    html_url: {
        type: String
    }
});

module.exports = commitSchema;