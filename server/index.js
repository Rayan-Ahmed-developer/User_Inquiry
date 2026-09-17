let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let enquiryRouter = require('./App/routes/web/enquiryRoutes');
require('dotenv').config();

let app = express();

app.use(cors());
app.use(express.json());

app.use('/api/website/enquiry', enquiryRouter);

let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  if (mongoose.connection.readyState === 1) {
    isConnected = true;
    return;
  }

  await mongoose.connect(process.env.DBURL);
  isConnected = true;
  console.log("connected to MongoDB");
}

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.log("error connecting to MongoDB", err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  connectDB()
    .then(() => {
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
}

module.exports = app;