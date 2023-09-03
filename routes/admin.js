const express = require('express')
const {getAdmins, getAdmin, createAdmin, deleteAdmin, updateAdmin}= require('../controllers/adminController.js')

const router=express.Router()

router.get('/', getAdmins)
router.get('/:id', getAdmin)
router.post('/', createAdmin)
router.delete('/:id', deleteAdmin)
router.patch('/:id', updateAdmin)


module.exports = router 