const getRepos = require('./serviceRepos')

module.exports = (app) => {
    //get the user's repos by user id
    app.get('/:user/repos', getRepos)
}