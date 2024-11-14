const Favorites = require("../models/favorites");
const asyncHandler = require("express-async-handler");

//whish list routes
exports.create = asyncHandler(async (req, res) => {
        const { productId, customerId } = req.body;
        if (!productId || !customerId) {
                return res.status(400).json({ message: "Please add all fields" });
        }
        const favorites = await Favorites.create(req.body);
        res.status(200).json(favorites);
})
// Get wishlists by customer ID
exports.getWhishlistByCustomerId = async (req, res) => {
    try {
      const customerId = req.params.customerId;
      const wishlist = await Favorites.find({ customerId }).populate('productId');
      if (!wishlist) {
        return res.status(404).json({ message: 'Wishlist not found' });
      }
      res.json(wishlist);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
    //delete whishlist
exports.delete = asyncHandler(async (req, res) => {
        const whishlist = await Favorites.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Whishlist deleted"});
})