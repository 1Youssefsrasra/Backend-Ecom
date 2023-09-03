const express = require('express')
const{getPaniers, getPanier, deletePanier, updatePanier, createPanier}= require('../controllers/panierController')

const requireAuth = require('../middleware/requireAuthClient')    

const router = express.Router()

router.use(requireAuth) //require auth for all cart routes

router.get('/', getPaniers)
router.get('/:id', getPanier) 
router.post('/', createPanier)
router.delete('/:id', deletePanier)
router.patch('/:id', updatePanier)


module.exports = router 