import mongoose from 'mongoose';
const challengeAttemptSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  offerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Offer', required: true },
  challengeType: { type: String, enum: ['solve-ptod', 'write-prompt', 'debug-backend', 'find-vulnerability'], required: true },
  challengeId: { type: String, required: true },
  status: { type: String, enum: ['under_construction', 'completed'], default: 'completed' },
  submittedAt: { type: Date, default: Date.now },
  completedAt: { type: Date, default: Date.now }
}, { timestamps: true });
export const ChallengeAttempt = mongoose.model('ChallengeAttempt', challengeAttemptSchema);
