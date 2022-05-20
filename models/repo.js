const {model} = require('mongoose')
const repoSchema = require('../schemas/repo')

module.exports = model('Repo', repoSchema)
