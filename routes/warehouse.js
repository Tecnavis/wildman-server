var express = require('express');
var router = express.Router();
var Controller = require('../controller/warehouse')

//ware house routes
 router.post('/',Controller.create)
 router.get('/',Controller.getAll)
 router.get('/:id',Controller.get)
 router.put('/:id',Controller.update)
 router.delete('/:id',Controller.delete)
 router.delete('/',Controller.deleteAll)

module.exports = router;
