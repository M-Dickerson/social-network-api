const router = require('express').Router();
// brings over the user controllers
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    createFriend,
    deleteFriend
} = require("../../controllers/userController");

// the route for getting and creating users
router.route("/").get(getUsers).post(createUser);
// the route for getting users by ID, updating and deleting users
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);
// allows friends to be created and deleted
router.route('/:userId/friends/:friendId').post(createFriend).delete(deleteFriend);

// export
module.exports = router;