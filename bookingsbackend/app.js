const express = require('express');
const { Mentor, Booking } = require('./database');

const app = express();
app.use(express.json()); // To parse JSON bodies

// GET /mentors: Fetch all mentors
app.get('/mentors', async (req, res) => {
  try {
    const mentors = await Mentor.findAll();
    res.json(mentors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch mentors' });
  }
});

// POST /bookings: Create a new booking
app.post('/bookings', async (req, res) => {
  const { studentName, mentorId, duration, date } = req.body;

  try {
    const booking = await Booking.create({
      studentName,
      mentorId,
      duration,
      date: new Date(date)
    });
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// GET /bookings: Retrieve bookings for a student or mentor
app.get('/bookings', async (req, res) => {
  const { studentName, mentorId } = req.query;
  let whereClause = {};

  if (studentName) {
    whereClause.studentName = studentName;
  }

  if (mentorId) {
    whereClause.mentorId = mentorId;
  }

  try {
    const bookings = await Booking.findAll({ where: whereClause });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
