const express = require('express')
const router=express.Router()
const {getWoman, getWomen, createWoman, updateWoman, deleteWoman}=require('../controllers/womenController')

router.get('/', getWomen)
router.get('/:id', getWoman)
router.post('/', createWoman)
router.delete('/:id', deleteWoman)
router.patch('/:id', updateWoman)


module.exports = router 