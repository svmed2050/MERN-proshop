import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc    Fetch all products
// @routr   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
	const pageSize = 10;
	const page = Number(req.query.pageNumber) || 1;

	const keyword = req.query.keyword
		? {
				name: {
					$regex: req.query.keyword, // match the part of the name
					$options: 'i', // case insensitive
				},
		  }
		: {};

	// console.log(req.query);
	// const keyword = req.query.keyword.split('=')[1] || {};

	// console.log(keyword);

	const count = await Product.countDocuments({ ...keyword });
	const products = await Product.find({ ...keyword })
		.limit(pageSize) // выдать 2 элемента
		.skip(pageSize * (page - 1)); // пропустить элементы предыдущих страниц

	res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single product
// @routr   GET /api/products/:id
// @access  Public

// router.get(
// 	'/:id',
// 	asyncHandler(async (req, res) => {
// 		const id = req.params.id;
// 		if (id.match(/^[0-9a-fA-F]{24}$/)) {
// 			const product = await Product.findById(id);
// 			if (product) {
// 				res.send(product);
// 			} else {
// 				res.status(404).send({ message: 'Product not found' });
// 			}
// 		} else {
// 			res.status(404).send({ message: 'Invalid id for product' });
// 		}
// 	})
// );
const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		res.json(product);
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

// @desc    Delete a product
// @routr   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		await product.deleteOne();
		res.json({ message: 'Product removed' });
	} else {
		throw new Error('Product not found');
	}
});

// @desc    Create a product
// @routr   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: 'Sample name',
		price: 0,
		user: req.user._id,
		image: '/images/sample.jpg',
		brand: 'Sample brand',
		category: 'Sample category',
		countInStock: 0,
		numReviews: 0,
		description: 'Sample description',
	});

	const createdProduct = await product.save();
	res.status(201).json(createdProduct);
});

// @desc    Update a product
// @routr   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
	const { name, price, description, image, brand, category, countInStock } =
		req.body;

	const product = await Product.findById(req.params.id);

	if (product) {
		product.name = name;
		product.price = price;
		product.description = description;
		product.image = image;
		product.brand = brand;
		product.category = category;
		product.countInStock = countInStock;

		const updatedProduct = await product.save();
		res.status(200).json(updatedProduct);
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

// @desc    Create new review
// @routr   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
	const { rating, comment } = req.body;
	const product = await Product.findById(req.params.id);

	if (product) {
		const alreadyReviewed = product.reviews.find(
			(r) => r.user.toString() === req.user._id.toString()
		);

		if (alreadyReviewed) {
			res.status(400);
			throw new Error('Product already reviewed');
		}

		const review = {
			name: req.user.name,
			rating: Number(rating),
			comment,
			user: req.user._id,
		};

		product.reviews.push(review);

		product.numReviews = product.reviews.length;

		product.rating =
			product.reviews.reduce((acc, item) => item.rating + acc, 0) /
			product.reviews.length;

		await product.save();
		res.status(201).json({ message: 'Review added' });
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

// @desc    Get top rated products
// @routr   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({}).sort({ rating: -1 }).limit(3);

	res.json(products);
});

export {
	getProducts,
	getProductById,
	deleteProduct,
	createProduct,
	updateProduct,
	createProductReview,
	getTopProducts,
};
