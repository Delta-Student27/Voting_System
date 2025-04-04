import mongoose from 'mongoose';
const { Schema } = mongoose;

const candidateSchema = new Schema({
  name: { type: String, required: true },
  bio: { type: String, required: true },
  election: { type: Schema.Types.ObjectId, ref: 'Election' },
  votes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const Candidate = mongoose.model('Candidate', candidateSchema);
export default Candidate;
