
const express = require('express');
const { submitGrievance } = require('../controllers/grievanceController');

const router = express.Router();

router.post('/add', submitGrievance);

module.exports = router;