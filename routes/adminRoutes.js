const express = require('express');
const {
    getAllComplaints,
    deleteComplaint,
    resolveComplaint,
    adminSignup,
    adminLogin
} = require('../controllers/adminController');

const router = express.Router();

router.get('/complaints', getAllComplaints);
router.delete('/delete', deleteComplaint);
router.patch('/resolve', resolveComplaint);
router.post('/signup', adminSignup);
router.post('/login', adminLogin);

module.exports = router;