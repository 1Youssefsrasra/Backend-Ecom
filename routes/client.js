const express= require('express')
const router=express.Router()

const {getClients, getClient, createClient, deleteClient, updateClient}=require('../controllers/clientController')


router.get('/', getClients)
router.get('/:id', getClient)
router.post('/', createClient)
router.delete('/:id', deleteClient)
router.patch('/:id', updateClient)


module.exports = router 