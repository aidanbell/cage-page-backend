const mongoose = require('mongoose');
let mongoURI =
  process.env.ENV === "development"
    ? "mongodb://localhost/cage-page"
    : process.env.DATABASE_URL;
mongoose.connect(mongoURI)
// mongoose.connect('mongodb://localhost/cage-page')
// database connection event
mongoose.connection.on('connected', function () {
  console.log(`Mongoose connected to: ${mongoURI}`);
});

module.exports = mongoose;
