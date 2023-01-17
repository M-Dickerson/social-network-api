const { User, Thought, Reaction } = require("../models");
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
                    ? res.status(404).json({ message: "Can't locate post" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
// creates a brand new thought(post)
    createThought(req, res) {
        Thought.create(req.body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { username: req.body.username },
                    { $push: { thought: _id } },
                    { new: true }
                );
            })
            .then((user) =>
                !user
                    ? res.status(404).json({
                        message: "The post you're looking for cannot be found",
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
                    ? res.status(404).json({ message: "No thought with this id" })
                    : thought.deleteMany({ _id: { $in: username } })
            )
            .then((thought) =>
                !thought
                    ? res.status(404).json({
                        message: "Thought created but no user with this id!",
                    })
                    : res.json({ message: "What was I thinking of again?" })
            )
            .catch((err) => res.status(500).json(err));
    },
// creates reactions
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtID },
            { $push: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "Could not find post by ID" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
// allows reactions to be deleted
    deleteReaction(req, res) {
        Reaction.findOneAndDelete(
            { _id: req.params.thoughtID },
            { $pull: { reactions: { reactionId: req.params.reactionID } } },
            { runValidators: true, new: true }
        )
            .then((Reaction) =>
                !Reaction
                    ? res.status(404).json({ message: "Could not find post by ID" })
                    : res.json(Reaction)
            )
            .catch((err) => res.status(500).json(err));
    },
};