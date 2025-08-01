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
      unique: true, // Ensures email is unique
    },
    password: {
      type: String,
      required: true,
    },
    photo: { // Optional: for user avatar URL
      type: String,
      default: '', // Default to empty string; logic in pre-save hook
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// COMBINED Pre-save middleware to handle both password hashing and default photo
userSchema.pre('save', async function (next) {
  // 1. Handle Password Hashing
  if (this.isModified('password')) { // Only hash if password field is modified
    const salt = await bcrypt.genSalt(10); // Generate a salt
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
  }

  // 2. Handle Default Photo Generation
  if (!this.photo) {
    const firstLetter = this.name ? this.name.charAt(0).toUpperCase() : 'U';
    // Use the dynamic placeholder image with the first letter
    this.photo = `https://placehold.co/40x40/cbd5e1/2a4365?text=${firstLetter}`;
  }

  next(); // Call next to proceed with the save operation
});

// Method to compare entered password with hashed password in DB
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
