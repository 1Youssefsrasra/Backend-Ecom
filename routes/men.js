const express = require('express')
const router=express.Router()
const {getMan, getMen, createMan, updateMan, deleteMan}=require('../controllers/menController')

router.get('/', getMen)
router.get('/:id', getMan)
router.post('/', createMan)
router.delete('/:id', deleteMan)
router.patch('/:id', updateMan)


module.exports = router 