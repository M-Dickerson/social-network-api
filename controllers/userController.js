const User = require("../models/user");
module.exports = {
// fetches all users
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
// returns a user by their ID
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userID })
            .select("-__v")
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user can be found with that ID" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
// creates a new user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
// updates a user based off their ID
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userID },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user can be found with that ID" })
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
// deletes a user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userID })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user can be found with that ID" })
                    : thought.deleteMany({ _id: { $in: user.username } })
            )
            .then(() => res.json({ message: "There is no longer a user with that ID" }))
            .catch((err) => res.status(500).json(err));
    },
// creates a friend
    createFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userID },
            { $push: { friends: req.params.friendID } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user can be found with that ID" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
// allows a friend to be deleted
    deleteFriend(req, res) {
        User.findOneAndDelete(
            { _id: req.params.userID },
            { $pull: { friends: { reactionId: req.params.friendID } } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user can be found with that ID" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
};