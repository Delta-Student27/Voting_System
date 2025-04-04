// candidateController.js
import Candidate from '../Models/Candidate.js';

export const getAllCandidates = async (req, res) => {
    try {
      const candidates = await Candidate.find();
      res.status(200).json(candidates);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const getCandidateById = async (req, res) => {
    try {
      const candidate = await Candidate.findById(req.params.id);
      if (!candidate) {
        return res.status(404).json({ message: 'Candidate not found' });
      }
      res.status(200).json(candidate);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const createCandidate = async (req, res) => {
    const candidate = new Candidate({
      name: req.body.name,
      bio: req.body.bio,
      election: req.body.election
    });
  
    try {
      const newCandidate = await candidate.save();
      res.status(201).json(newCandidate);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  export const updateCandidate = async (req, res) => {
    try {
      const candidate = await Candidate.findById(req.params.id);
      if (!candidate) {
        return res.status(404).json({ message: 'Candidate not found' });
      }
  
      candidate.name = req.body.name || candidate.name;
      candidate.bio = req.body.bio || candidate.bio;
      candidate.election = req.body.election || candidate.election;
      candidate.votes = req.body.votes || candidate.votes;
  
      const updatedCandidate = await candidate.save();
      res.status(200).json(updatedCandidate);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  export const deleteCandidate = async (req, res) => {
    try {
      const candidate = await Candidate.findById(req.params.id);
      if (!candidate) {
        return res.status(404).json({ message: 'Candidate not found' });
      }
  
      await candidate.remove();
      res.status(200).json({ message: 'Candidate deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  