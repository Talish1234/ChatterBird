import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: 'Hey there! I am using Chatter Bird.'
    },
    isVerified: {
        type: Boolean,
        default: false,
        required: true
    },
    profilePicture: {
        type: String,
        default: 'https://snapynow.com/wp-content/uploads/2024/05/no-dp_16.webp',
        required: true
    },
    publicId: {
      type:String  
    }
});

const User = mongoose.model('User', userSchema);

export default User;
