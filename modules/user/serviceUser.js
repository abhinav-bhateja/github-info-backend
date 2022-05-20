const axios = require("axios");
const User = require("../../models/user");

const fetchUser = async (user, res) => {
    let userData;
    try {
        userData = await axios.get(`https://api.github.com/users/${user}`);
    } catch (err) {
        res.status(500).json({message: "Github Error: " + err.message});
    }
    return {
        name: userData.data.name,
        bio: userData.data.bio,
        html_url: userData.data.html_url
    };
}

const createUser = async (user, res, userName) => {
    const newUser = new User({
        _id: userName,
        name: user.name,
        bio: user.bio,
        avatar_url: user.avatar_url,
        html_url: user.html_url
    })

    try {
        await newUser.save((err) => {
            if (err) {
                throw err;
            } else {
                res.status(201)
            }
        })
    } catch (err) {
        return res.status(400).json({message: "Failed to create data in Database. Error: " + err.message});
    }
}

const getUser = async (req, res) => {
    let user;
    try {
        user = await User.findById(req.params.user);

        if (user == null) {
            user = await fetchUser(req.params.user, res)
            await createUser(user, res, req.params.user)
        }
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
    res.json(user)
}

module.exports = getUser