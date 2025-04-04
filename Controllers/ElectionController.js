import Election from '../Models/Election.js';

// Get all elections
export const getAllElections = async (req, res) => {
  try {
    const elections = await Election.find().populate('candidates');
    res.status(200).json(elections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get election by ID
export const getElectionById = async (req, res) => {
  try {
    const election = await Election.findById(req.params.id).populate('candidates');
    if (!election) {
      return res.status(404).json({ message: 'Election not found' });
    }
    res.status(200).json(election);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new election
export const createElection = async (req, res) => {
  const election = new Election({
    title: req.body.title,
    description: req.body.description,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    candidates: req.body.candidates
  });

  try {
    const newElection = await election.save();
    res.status(201).json(newElection);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an election
export const updateElection = async (req, res) => {
  try {
    const election = await Election.findById(req.params.id);
    if (!election) {
      return res.status(404).json({ message: 'Election not found' });
    }

    election.title = req.body.title || election.title;
    election.description = req.body.description || election.description;
    election.startDate = req.body.startDate || election.startDate;
    election.endDate = req.body.endDate || election.endDate;
    election.candidates = req.body.candidates || election.candidates;

    const updatedElection = await election.save();
    res.status(200).json(updatedElection);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an election
export const deleteElection = async (req, res) => {
  try {
    const election = await Election.findById(req.params.id);
    if (!election) {
      return res.status(404).json({ message: 'Election not found' });
    }

    await election.remove();
    res.status(200).json({ message: 'Election deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
