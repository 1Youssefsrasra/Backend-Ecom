const express = require('express')
const {getUsers, getUser, createUser, deleteUser, updateUser, loginUser, signupUser} = require('../controllers/userController')

const router = express.Router()


router.get('/', getUsers)
router.get('/:id', getUser)
router.post('/', createUser)
router.delete('/:id', deleteUser)
router.patch('/:id', updateUser)

//login route
router.post('/login', loginUser)

//signup route
router.post('/signup', signupUser)


module.exports = router 