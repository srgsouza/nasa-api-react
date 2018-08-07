const mongoose = require('mongoose');
const db = mongoose.connection;
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/nasa-images?`

mongoose.connect(url, { useNewUrlParser: true })

db.on('connected', () => {
  console.log("DB is connected");
})

db.on('disconnected', () => {
  console.log("DB is disconnected");
})

db.on('error', (err) => {
  console.log('DB error: ' + err);

})

module.exports = url;