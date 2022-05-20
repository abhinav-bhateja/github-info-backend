const {model} = require('mongoose')
const commitSchema = require('../schemas/commit')

module.exports = model('Commit', commitSchema)