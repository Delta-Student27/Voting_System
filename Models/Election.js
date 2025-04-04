// Models/Election.js
import mongoose from 'mongoose';

const ElectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  candidates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' }],
  voters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Voter' }],
  scheduleDate: { type: Date, required: true },
});

const Election = mongoose.model('Election', ElectionSchema);

export default Election;
