import Voter from '../Models/Voter.js';

// Get all voters
export const getAllVoters = async (req, res) => {
  try {
    const voters = await Voter.find().populate('user_id');
    res.status(200).json(voters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get voter by ID
export const getVoterById = async (req, res) => {
  try {
    const voter = await Voter.findById(req.params.id).populate('user_id');
    if (!voter) {
      return res.status(404).json({ message: 'Voter not found' });
    }
    res.status(200).json(voter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new voter
export const createVoter = async (req, res) => {
  const voter = new Voter({
    user_id: req.body.user_id,
    voter_registration_number: req.body.voter_registration_number,
    voting_status: req.body.voting_status
  });

  try {
    const newVoter = await voter.save();
    res.status(201).json(newVoter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a voter
export const updateVoter = async (req, res) => {
  try {
    const voter = await Voter.findById(req.params.id);
    if (!voter) {
      return res.status(404).json({ message: 'Voter not found' });
    }

    voter.user_id = req.body.user_id || voter.user_id;
    voter.voter_registration_number = req.body.voter_registration_number || voter.voter_registration_number;
    voter.voting_status = req.body.voting_status || voter.voting_status;

    const updatedVoter = await voter.save();
    res.status(200).json(updatedVoter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a voter
export const deleteVoter = async (req, res) => {
  try {
    const voter = await Voter.findById(req.params.id);
    if (!voter) {
      return res.status(404).json({ message: 'Voter not found' });
    }

    await voter.remove();
    res.status(200).json({ message: 'Voter deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
