import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateProductById = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteProductById = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product has been deleted!" });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAllProducts = async (req, res) => {
  const latestProductsQuery = req.query.new;
  const categoryQuery = req.query.category;

  try {
    let products;

    if (latestProductsQuery) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (categoryQuery) {
      products = await Product.find({
        categories: {
          $in: [categoryQuery],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};
