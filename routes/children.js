const express = require('express')
const router=express.Router()
const {getChild, getChildren, createChild, updateChild, deleteChild}=require('../controllers/childrenController')

router.get('/', getChildren)
router.get('/:id', getChild)
router.post('/', createChild)
router.delete('/:id', deleteChild)
router.patch('/:id', updateChild)


module.exports = router 