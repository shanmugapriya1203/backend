import express from "express";
const router = express.Router();
import FitnessActivity from '../models/Fitness.js'
import authUser from '../middlewares/authUser.js'

// Route to save fitness activity data
router.post('/fitnessActivity', authUser, async (req, res) => {
  const { date, exerciseType, duration, distance, notes } = req.body;
  try {
    const newFitnessActivity = new FitnessActivity({
      user: req.user._id,
      date,
      exerciseType,
      duration,
      distance,
      notes,
    });
    await newFitnessActivity.save();
    res.status(200).json({ message: 'Fitness activity saved successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving fitness activity data.' });
    console.log(error)
  }
});


export default router;