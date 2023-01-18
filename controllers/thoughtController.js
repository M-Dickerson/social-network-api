const { User, Thought } = require("../models");
module.exports = {
// fetches all thoughts(posts)
    getThought(req, res) {
        Thought.find()
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
// returns a single thought(post) by ID
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtID })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "Can't find a post with that ID" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
// creates a brand new thought(post)
    createThought(req, res) {
        Thought.create(req.body)
            .then(({_id}) => {
                return User.findOneAndUpdate(
                    { username: req.body.username },
                    { $push: { thoughts: _id } },
                    { new: true },
                )
            })
            .then((user) =>
                !user
                    ? res.status(404).json({
                        message: "Cannot create a new post",
                    })
                    : res.json("Created a new post 🎉")
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
// updates an existing thought(post) through its ID
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtID },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "There's no post with this ID" })
                    : res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
// allows a thought(post) to be deleted by its ID
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtID })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "There's no post with this ID" })
                    : thought.deleteMany({ _id: { $in: username } })
            )
            .then((thought) =>
                !thought
                    ? res.status(404).json({
                        message: "There's no post with this ID",
                    })
                    : res.json({ message: "Post successfully deleted! 🎉" })
            )
            .catch((err) => res.status(500).json(err));
    },
// creates reactions
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtID },
            { $addToSet:{ reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "Could not create a reaction" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
// allows reactions to be deleted
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtID },
            { $pull: { reactions: { reactionID: req.params.reactionID } } },
            { runValidators: true, new: true }
        )
            .then((Reaction) =>
                !Reaction
                    ? res.status(404).json({ message: "Could not find a reaction with this ID" })
                    : res.json(Reaction)
            )
            .catch((err) => res.status(500).json(err));
    },
};