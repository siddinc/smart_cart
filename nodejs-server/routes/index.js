'use strict';

const router = require('express').Router();
const { createUser, stopCart, startCart, postItem, getItems } = require('../controllers/index.js');

router.post('/post_item', postItem);

router.post('/stop_cart', stopCart);

router.post('/stop_cart', startCart);

router.post('/create_user', createUser);

router.get('/get_items', getItems);

module.exports = router;