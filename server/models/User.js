// server/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // For password hashing

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, 
    },
    password: {
      type: String,
      required: true,
    },
    photo: { 
      type: String,
      default: '',
    },
  },
  {
    timestamps: true, 
  }
);

// COMBINED Pre-save middleware to handle both password hashing and default photo
userSchema.pre('save', async function (next) {
  // 1. Handle Password Hashing
  if (this.isModified('password')) { 
    const salt = await bcrypt.genSalt(10); 
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
  }

  // 2. Handle Default Photo Generation
  if (!this.photo) {
    const firstLetter = this.name ? this.name.charAt(0).toUpperCase() : 'U';
    // Use the dynamic placeholder image with the first letter
    this.photo = `https://placehold.co/40x40/cbd5e1/2a4365?text=${firstLetter}`;
  }

  next(); 
});

// Method to compare entered password with hashed password in DB
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
