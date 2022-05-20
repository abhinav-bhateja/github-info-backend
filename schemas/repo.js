const {Schema} = require('mongoose');
const commitSchema = require('./commit')

const repoSchema = new Schema({
    _id: {
        type: String
    },
    html_url: {
        type: String
    },
    commits: [commitSchema]
});

module.exports = repoSchema;
