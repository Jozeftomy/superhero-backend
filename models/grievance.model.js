const mongoose = require('mongoose');

const GrievanceSchema = new mongoose.Schema({
    email: { type: String, required: true },
    message: { type: String, required: true },
    done: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Grievance', GrievanceSchema);