let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let enquiryRouter = require('./App/routes/web/enquiryRoutes');
require('dotenv').config();

let app = express();

app.use(cors());
app.use(express.json());

let dbPromise = null;

async function connectDB() {
  if (mongoose.connection.readyState === 1) return;

  if (!dbPromise) {
    dbPromise = mongoose.connect(process.env.DBURL, {
      serverSelectionTimeoutMS: 10000,
      bufferCommands: false,
    });
  }

  try {
    await dbPromise;
    console.log("connected to MongoDB");
  } catch (err) {
    dbPromise = null;
    throw err;
  }
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

app.use('/api/website/enquiry', enquiryRouter);

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