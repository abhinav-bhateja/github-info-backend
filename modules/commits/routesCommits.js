const getCommits = require('./serviceCommits')

module.exports = (app) => {
    //get the user's commits by user id and repo id
    app.get('/:user/:repo/commits', getCommits)
}