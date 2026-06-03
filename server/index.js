let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let enquiryRouter = require('./App/routes/web/enquiryRoutes');
require('dotenv').config();

let app = express();

app.use(cors({
    origin: 'https://user-inquiry.vercel.app', 
    credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/website/enquiry', enquiryRouter);

const PORT = process.env.PORT || 3000;

// 2. Database Connection and Server Listen Sequence Fix
mongoose.connect(process.env.DBURL)
    .then(() => {
        console.log("connected to MongoDB");
        app.listen(PORT, () => {
            console.log("Server is running on port", PORT);
        });
    })
    .catch((err) => {
        console.log("error connecting to MongoDB", err);
        // DB fail bhi ho jaye to server crash na ho, taake 502 error na aaye
        app.listen(PORT, () => {
            console.log("Server running on port (DB Connection Failed)", PORT);
        });
    });