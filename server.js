require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const cors = require('cors');

// for css and static view.
app.use(express.static('public'));


const connectDB = require('./config/db.js');
connectDB();


// CORS
const corsOptions = {
    origin : process.env.ALLOWED_CLIENTS.split(',')
}
app.use(cors(corsOptions));
app.use(express.json());

// Template Engine
app.set('views',path.join(__dirname,'/views'));
app.set('view engine','ejs');


// Routes
app.use('/api/files', require('./routes/files'));
app.use('/files',require('./routes/show'));
app.use('/files/download',require('./routes/download'));

app.listen(PORT, () => {
    console.log(`Example app listening on ${PORT}`);
});