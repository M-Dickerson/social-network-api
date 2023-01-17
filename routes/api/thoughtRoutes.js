const router = require("express").Router();
// brings over the thought controllers
const {
    getThought,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require("../../controllers/thoughtController");

// the route for getting and creating thoughts(posts)
router.route("/").get(getThought).post(createThought);
// the route for getting thoughts(posts) by ID, updating and deleting thoughts(posts)
router.route("/:thoughtID").get(getSingleThought).put(updateThought).delete(deleteThought);
// allows reactions to be created
router.route("/:thoughtID/reactions").post(createReaction);
// allows reactions to be deleted
router.route("/:thoughtID/reactions/:reactionID").delete(deleteReaction);

// export
module.exports = router;