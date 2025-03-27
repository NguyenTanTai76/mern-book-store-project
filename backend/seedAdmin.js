// seedAdmin.js
const mongoose = require('mongoose');
const User = require('./src/users/user.model');

require('dotenv').config();

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const existingAdmin = await User.findOne({ username: 'admin1' });
    if (existingAdmin) {
      console.log('Admin already exists:', existingAdmin);
    } else {
      const admin = new User({
        username: 'admin1',
        password: '123456', // Sẽ được băm tự động bởi pre-save hook
        role: 'admin',
      });
      await admin.save();
      console.log('Admin created:', admin);
    }
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
}

seedAdmin();
