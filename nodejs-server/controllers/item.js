'use strict';

exports.postItemID = async (req, res, next) => {
  const { itemID, topic } = req.body;
  console.log(itemID, topic);
  return res.status(200).send(`Item ID: ${itemID} posted successfully on HTTP server`);
};
