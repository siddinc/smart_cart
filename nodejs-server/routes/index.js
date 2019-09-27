'use strict';

const router = require('express').Router();
const { postItemID } = require('../controllers/item');

router.post('/post_item_id', postItemID);

module.exports = router;