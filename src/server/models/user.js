const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../config/database");

const UserSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model("User",UserSchema);

module.exports = User;

module.exports.getUserById = async id => {
    try {
        const user = await User.findById(id);
        return user;
    } catch (error) {
        return error;
    }
}
module.exports.getUserByUserName = async userName => {
    try {
        const query = { userName : userName };
        const user = await User.findOne( query );
        return user;
    } catch (error) {
        return error;
    }
}

module.exports.addUser = async newUser => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newUser.password, salt);
        newUser.password = await hash;
        await newUser.save();
        return "success";
    } catch (error) {
        return "error saving";
    }
}

module.exports.comparePassword = async (candidatePassword, hash) => {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, hash);
        return isMatch;
    } catch (error) {
        console.error(error);
    }
}