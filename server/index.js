let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let enquiryRouter = require('./App/routes/web/enquiryRoutes');
require('dotenv').config();
let app = express();

app.use(cors({
    origin: 'https://user-inquiry.vercel.app', // Sirf aapka frontend allow hoga
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Jo methods aap use kar rahe hain
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/website/enquiry', enquiryRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});

mongoose.connect(process.env.DBURL).then(() => {
    console.log("connected to MongoDB");
}).catch((err) => {
    console.log("error connecting to MongoDB", err);
});