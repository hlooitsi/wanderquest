const Tour = require('./../models/tourModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

module.exports.renderAllTours = catchAsync(async (req, res, next) => {
	const tours = await Tour.find();
	res.status(200).render('tours/index', {
		title: 'All tours',
		tours,
	});
});

module.exports.renderTour = catchAsync(async (req, res, next) => {
	const tour = await Tour.findOne({ slug: req.params.tourSlug }).populate('reviews');
	if (!tour) return next(new AppError('Tour not found', 404));

	res.status(200).render('tours/show', {
		title: tour.name,
		tour,
		mapboxAccessToken: process.env.MAPBOX_ACCESS_TOKEN,
	});
});

module.exports.renderLoginForm = (req, res) => {
	res.status(200).render('users/login', { title: 'Login' });
};

module.exports.renderAccountPage = (req, res) => {
	res.status(200).render('users/account', { title: 'My account' });
};
