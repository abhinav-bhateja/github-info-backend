const axios = require("axios");
const User = require("../../models/user");
const _ = require('lodash');

const fetchCommits = async (user, repo, res) => {
    let commitData;
    let result;

    try {
        commitData = await axios.get(`https://api.github.com/repos/${user}/${repo}/commits`)
    } catch (err) {
        res.status(500).json({message: "Github Error: " + err.message});
    }

    result = commitData.data.map(commit => {
        return {
            _id: commit.sha,
            committer: commit.commit.committer.name,
            committer_url: commit.committer.html_url,
            html_url: commit.html_url,
            message: commit.commit.message,
        }
    })
    return result;
}

//create user's commits
const createCommits = async (user, repoIndex, commits, res) => {
    try {
        await user.updateOne({
            $push: {
                [`repos[${repoIndex}]`.commits]: commits
            }
        })
    } catch (err) {
        return res.status(400);
    }
}

//get user's commits
const getCommits = async (req, res) => {
    let commits;
    try {

        const user = await User.findById(req.params.user)
        const repo = _.find(user.repos, (data) => {
            return data._id == req.params.repo
        })
        const repoIndex = _.findIndex(user.repos, (data) => {
            return data._id == req.params.repo
        })

        commits = repo['commits']
        if (commits.length === 0) {
            commits = await fetchCommits(req.params.user, req.params.repo, res)
            await createCommits(user, repoIndex, commits, res)
        }
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
    res.json(commits)
}

module.exports = getCommits