import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema({
  amount: { 
    type: Number, 
    required: true 
  },
  type: { 
    type: String, 
    enum: ['Income', 'Expense'], 
    required: true 
  },
  category: { 
    type: String, 
    required: true, 
    enum: [
      "salary", "freelance", "business", "investment",
      "rent", "food", "travel", "shopping",
      "utilities", "medical", "education", "other"
    ] 
  },
  date: { 
    type: Date, 
    required: true 
  },
  notes: { 
    type: String, 
    default: '' 
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  isDeleted: { 
    type: Boolean, 
    default: false 
  },
  deletedAt: { 
    type: Date, 
    default: null 
  }
}, { timestamps: true });

export const Record = mongoose.model('Record', recordSchema);