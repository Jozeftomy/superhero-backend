const jwt = require('jsonwebtoken');
const Grievance = require('../models/grievance.model');
const Admin = require('../models/admin.model');

exports.getAllComplaints = async (req, res) => {
    try {
        const complaints = await Grievance.find();
        res.status(200).json(complaints);
    } catch (err) {
        console.error('Error getting complaints:', err);
        res.status(500).json({ message: err.message });
    }
};

exports.deleteComplaint = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: "Email is required" });
        
        const deletedGrievance = await Grievance.findOneAndDelete({ email });
        if (!deletedGrievance) return res.status(404).json({ message: "Grievance not found" });
        
        res.status(200).json({ message: "Grievance deleted successfully" });
    } catch (err) {
        console.error("Error deleting grievance:", err);
        res.status(500).json({ message: "Error deleting grievance" });
    }
};

exports.resolveComplaint = async (req, res) => {
    try {
        const { email } = req.body;
        const updatedGrievance = await Grievance.findOneAndUpdate(
            { email }, 
            { done: true }, 
            { new: true }
        );
        
        if (!updatedGrievance) return res.status(404).json({ message: "Grievance not found" });
        res.json({ message: "Grievance resolved", grievance: updatedGrievance });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
};

exports.adminSignup = async (req, res) => {
    try {
        const newAdmin = await Admin.create(req.body);
        res.status(201).json({ data: newAdmin });
    } catch (err) {
        console.error("Failed to register admin", err);
        res.status(500).json({ message: err.message });
    }
};

exports.adminLogin = async (req, res) => {
    try {
        const admin = await Admin.findOne({ email: req.body.email, password: req.body.password });
        if (admin) {
            const token = jwt.sign({ email: admin.email }, 'SECRET_KEY', { expiresIn: '1h' });
            res.status(200).json({ message: 'Login successful', token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (err) {
        console.error('Failed to login', err);
        res.status(500).json({ message: err.message });
    }
};