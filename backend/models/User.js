const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["user", "organizer", "admin"],
    default: "user"
  },
  phone: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Generate unique userId before saving
userSchema.pre('save', async function(next) {
  if (!this.userId) {
    const rolePrefix = {
      'user': 'USR',
      'organizer': 'ORG',
      'admin': 'ADM'
    };
    const prefix = rolePrefix[this.role] || 'USR';
    const randomNum = Math.floor(100000 + Math.random() * 900000); // 6 digit number
    this.userId = `${prefix}${randomNum}`;
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
