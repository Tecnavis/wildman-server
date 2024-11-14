var express = require('express');
var router = express.Router();
var Controller = require('../controller/favorites');

//whish list routes
router.post('/',Controller.create)
router.get("/customers/:customerId",Controller.getWhishlistByCustomerId);
router.delete('/:id',Controller.delete)


module.exports = router;
