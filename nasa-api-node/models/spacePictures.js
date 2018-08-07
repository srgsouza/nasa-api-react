const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SpacePictureSchema = new Schema({
  imageUrl: String,
  title: String,
  explanation: String
})

const SpacePicture = mongoose.model('SpacePicture', SpacePictureSchema);

module.exports = SpacePicture;
