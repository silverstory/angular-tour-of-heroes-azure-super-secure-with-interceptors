const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create ninja schema & model
const HeroSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  }
},
{
    collection: 'heroes',
    read: 'nearest'
});

const Hero = mongoose.model('Hero', HeroSchema);

module.exports = Hero;