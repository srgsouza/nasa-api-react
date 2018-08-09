const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SpacePictureSchema = new Schema({
  url: String,
  title: String,
  explanation: String,
  date: String,
  comment: String
})

const SpacePicture = mongoose.model('SpacePicture', SpacePictureSchema);

module.exports = SpacePicture;
