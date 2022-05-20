const axios = require("axios");
const User = require("../../models/user");

const fetchRepos = async (user, res) => {
    let repoData;
    let result;

    try {
        repoData = await axios.get(`https://api.github.com/users/${user}/repos`)
    } catch (err) {
        res.status(500).json({message: "Github Error: " + err.message});
    }

    result = repoData.data.map(repo => {
        return {
            _id: repo.name,
            html_url: repo.html_url
        }
    })
    return result;
}

//create user's repos
const createRepos = async (user, repos, res) => {
    try {
        await user.updateOne({
            $push: {
                repos: repos
            }
        })
    } catch (err) {
        return res.status(400);
    }
}

const getRepos = async (req, res) => {
    let repos;
    try {
        let user = await User.findById(req.params.user)
        repos = user['repos']
        if (repos.length === 0) {
            repos = await fetchRepos(req.params.user, res)
            await createRepos(user, repos, res)
        }
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
    res.json(repos)
}

module.exports = getRepos
