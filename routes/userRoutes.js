const express = require ('express')
const { getAllUsersController, registerUserController, loginUserController } = require('../controllers/userControllers')

// router object

const router = express.Router()

// GET ALL USERS
router.get('/get-all-users', getAllUsersController)

// CREATE NEW USER
router.post('/register', registerUserController)

// LOGIN
router.post("/login", loginUserController)

module.exports = router;