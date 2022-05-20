const user = require('./modules/user');
const repos = require('./modules/repos');
const commits = require('./modules/commits');

module.exports = (
    app,
) => {
    commits.routesCommits(app, commits)
    repos.routerRepos(app, repos)
    user.routesUser(app, user)
};