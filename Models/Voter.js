import mongoose from 'mongoose';
const { Schema } = mongoose;

const VoterSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  voter_registration_number: {
    type: Number,
    required: true
  },
  voting_status: {
    type: Boolean,
    default: false
  }
});

const Voter = mongoose.model('Voter', VoterSchema);
export default Voter;
