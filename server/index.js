let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let enquiryRouter = require('./App/routes/web/enquiryRoutes');
require('dotenv').config();

let app = express();

app.use(cors()); 

app.use(express.json());

app.use('/api/website/enquiry', enquiryRouter);

const PORT = process.env.PORT || 3000;


mongoose.connect(process.env.DBURL)
    .then(() => {
        console.log("connected to MongoDB");
        app.listen(PORT, () => {
            console.log("Server is running on port", PORT);
        });
    })
    .catch((err) => {
        console.log("error connecting to MongoDB", err);
   
        app.listen(PORT, () => {
            console.log("Server running on port (DB Connection Failed)", PORT);
        });
    });