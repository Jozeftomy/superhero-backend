const nodemailer = require('nodemailer');
const Grievance = require('../models/grievance.model');

exports.submitGrievance = async (req, res) => {
    try {
        const newGrievance = await Grievance.create(req.body);
        res.status(201).json({ data: newGrievance });
        let email = req.body.email;
        console.log(email);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user:'josephtomy2001@gmail.com',
                pass: 'qfzb lnac ivwo rhew'
            }
        });

        const mailOptions = {
            from: email,
            to: 'josephtomy2001@gmail.com',
            subject: 'New Grievance Submitted',
            text: req.body.message
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) console.error("Error sending email:", error);
            else console.log('Email sent: ' + info.response);
        });
    } catch (err) {
        console.error("Error saving grievance:", err);
        res.status(500).json({ message: err.message });
    }
};