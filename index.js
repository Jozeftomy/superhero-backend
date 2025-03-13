const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const grievanceRoutes = require('./routes/grievanceRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect('mongodb+srv://dbUser:nSOBtnyyh5XOddc7@backenddb.ztto5.mongodb.net/Grievance?retryWrites=true&w=majority&appName=BackendDB')
.then(() => {
    console.log('Connected to database!')
})
.catch(() => {
     console.log('Connection failed!')
});


app.use('/grievance', grievanceRoutes);
app.use('/admin', adminRoutes);

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});