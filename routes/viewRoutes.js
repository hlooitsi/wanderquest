const express = require('express');
const viewController = require('./../controllers/viewController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.get('/', (req, res) => {
	res.status(200).render('home', { title: 'Home' });
});

router.use(authController.addUserLocal);

router.get('/tours', viewController.getAllTours);
router.get('/tours/:tourSlug', viewController.getTour);

router.get('/login', viewController.getLoginForm);

module.exports = router;
