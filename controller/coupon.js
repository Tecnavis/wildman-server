const Modal = require("../models/coupon");

exports.create= async (req, res) => {
    try {
        const data = await Modal.create(req.body);
        res.json(data);
    } catch (error) {
        res.json({ message: error.message });
    }
};

exports.getAll = async (req, res) => {
    try {
        const data = await Modal.find().populate('products');
        res.json(data);
    } catch (error) {
        res.json({ message: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const data = await Modal.findByIdAndDelete(req.params.id);
        res.json(data);
    } catch (error) {
        res.json({ message: error.message });
    }
};

exports.get = async (req, res) => {
    try {
        const data = await Modal.findById(req.params.id);
        res.json(data);
    } catch (error) {
        res.json({ message: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const data = await Modal.findByIdAndUpdate(req.params.id, req.body);
        res.json(data);
    } catch (error) {
        res.json({ message: error.message });
    }
};

