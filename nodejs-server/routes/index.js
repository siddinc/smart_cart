'use strict';

const router = require('express').Router();
const { signIn, stopCart, postItem, getItems } = require('../controllers/index');

router.post('/sign_in', signIn);

// router.post('/post_item', postItem);

// router.post('/stop_cart', stopCart);

// router.get('/get_items', getItems);

module.exports = router;