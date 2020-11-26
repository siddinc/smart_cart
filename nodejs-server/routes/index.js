'use strict';

const router = require('express').Router();
const { signIn, stopCart, postItem, getItems, deleteItem } = require('../controllers/index');
const { verifyAuthentication, verifyAuthorization } = require('../middleware/index');

router.post('/sign_in', signIn);

router.post('/stop_cart', verifyAuthentication, verifyAuthorization, stopCart);

router.post('/post_item', verifyAuthentication, postItem);

router.post('/get_items', verifyAuthentication, verifyAuthorization, getItems);

router.delete('/delete_item', verifyAuthentication, deleteItem);

module.exports = router;