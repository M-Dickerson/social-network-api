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
        Thought.findOne({ _id: req.params.thoughtId })
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
    // updates an existing thought(post)
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
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

}