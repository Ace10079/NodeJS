const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://karan:karan10079@cluster0.3bojfor.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// ... (continue to next step)
const SurveyResponse = mongoose.model('SurveyResponse', {
    name: String,
    email: String,
    gender: String,
    city: String,
    agree: Boolean,
  });
// Parse JSON requests
app.use(express.json());

// Handle POST request from Flutter app
app.post('/submit-survey', async (req, res) => {
  try {
    const { name, email, gender, city, agree } = req.body;

    // Create a new document
    const response = new SurveyResponse({ name, email, gender, city, agree });
    await response.save();

    // Send success response
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    // Send error response
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


  
