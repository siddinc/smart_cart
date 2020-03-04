'use strict';

const router = require('express').Router();
const { /*signUp,*/ signIn, stopCart, postItem, getItems, deleteItem } = require('../controllers/index');
const { verifyAuthentication } = require('../middleware/index');

// router.post('/sign_up', signUp);

router.post('/sign_in', verifyAuthentication, signIn);

router.post('/stop_cart', verifyAuthentication, stopCart);

router.post('/post_item', verifyAuthentication, postItem);

router.post('/get_items', verifyAuthentication, getItems);

router.delete('/delete_item', verifyAuthentication, deleteItem);

module.exports = router;