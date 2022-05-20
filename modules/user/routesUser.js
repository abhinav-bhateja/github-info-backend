const getUser = require('./serviceUser')

module.exports = (app) => {
    //Route to get User By ID
    app.get('/:user', getUser)
}