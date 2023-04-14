import mongoose from "mongoose";

const FitnessActivitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  exerciseType: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  distance: {
    type: Number,
    required: false,
  },
  notes: {
    type: String,
    required: false,
  },
});


export default mongoose.model("FitnessActivity",FitnessActivitySchema)