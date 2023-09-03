const express= require('express')
const {getCommand, getCommands, createCommand, updateCommand, deleteCommand} =require('../controllers/commandController')
const router= express.Router()



router.get('/', getCommands)
router.get('/:id', getCommand)
router.post('/', createCommand)
router.delete('/:id', deleteCommand)
router.patch('/:id', updateCommand)

module.exports= router