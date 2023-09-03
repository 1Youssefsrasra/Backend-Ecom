const express = require('express');
const router = express.Router();

const productsRouter = require('./products');
const usersRouter = require('./user');
const adminsRouter = require('./admin');
const clientsRouter = require('./client');
const paniersRouter = require('./panier');
const commandRouter = require('./command');
const menRouter = require('./men');
const womenRouter = require('./women');
const childrenRouter = require('./children');

//routes
router.use('/products', productsRouter);
router.use('/user', usersRouter);
router.use('/admin', adminsRouter);
router.use('/client', clientsRouter);
router.use('/panier', paniersRouter);
router.use('/command', commandRouter);
router.use('/men', menRouter);
router.use('/women', womenRouter);
router.use('/children', childrenRouter);

module.exports = router;