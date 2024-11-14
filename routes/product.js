var express = require('express');
var router = express.Router();
const Controller = require('../controller/product')
const Product = require('../models/products');
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// //product routes
var upload = multer({ storage: storage }).fields([{ name: 'images', maxCount: 10 }, { name: 'coverimage', maxCount: 1 }]);

router.post('/', upload, Controller.create);
router.get('/',Controller.getAll)
router.get('/:id',Controller.get)
router.put('/:id',upload,Controller.update)
router.delete('/:id',Controller.deleteProduct)
router.get('/category/products', Controller.getProductsByCategory);

// Deduct product stock when order product
router.put('/:id/stock', async (req, res) => {
  const { id } = req.params;
  const { size, quantity } = req.body; 

  try {
    const product = await Product.findById(id);
    const sizeObject = product.sizes.find(s => s.size === size);
    if (sizeObject) {
      if (sizeObject.stock >= quantity) {
        sizeObject.stock -= quantity;
        await product.save(); 
        res.status(200).send({ message: 'Stock updated successfully' });
      } else {
        res.status(400).send({ message: 'Not enough stock available' });
      }
    } else {
      res.status(404).send({ message: 'Size not found' });
    }
  } catch (error) {
    console.error("Error updating stock", error);
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = router;
