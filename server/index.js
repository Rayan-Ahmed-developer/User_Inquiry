let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let enquiryRouter = require('./App/routes/web/enquiryRoutes');
require('dotenv').config();
let app = express();

app.use(cors());
app.use(express.json());

//Routes
app.use('/api/website/enquiry',enquiryRouter);


mongoose.connect(process.env.DBURL).then(()=>{
    console.log("connected to MongoDB");
    app.listen(process.env.PORT || 3000, () => {
   console.log("Server is running on port", process.env.PORT || 3000);
});
    // app.listen(process.env.PORT|| 3000,()=>{
    //    console.log("server is running on");
    // });
}).catch((err)=>{
    console.log("error connecting to MongoDB",err);
});