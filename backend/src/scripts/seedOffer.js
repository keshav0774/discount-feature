import 'dotenv/config';
import { connectDatabase } from '../config/database.js';
import { Offer } from '../models/Offer.js';
const now = new Date();
const expiresAt = new Date(now); expiresAt.setDate(expiresAt.getDate() + 30);
await connectDatabase();
const offer = await Offer.findOneAndUpdate(
  { courseId: process.env.DEFAULT_COURSE_ID || 'strike-hackathon-6' },
  { courseId: process.env.DEFAULT_COURSE_ID || 'strike-hackathon-6', minDiscount: 15, maxDiscount: 25, startsAt: now, expiresAt, isActive: true },
  { upsert: true, new: true, runValidators: true }
);
console.log(`Seeded offer ${offer._id}`);
process.exit(0);
