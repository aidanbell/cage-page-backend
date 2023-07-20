const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Movie = require('./movie')


const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true
    },
    googleId: {
      type: String,
      unique: true,
      required: true
    },
    email: {
      type: String
    },
    picture: String,
    watched: [{
      type: Schema.Types.ObjectId,
      ref: 'Movie'
    }]
  }, {
    timestamps: true,
    toObject: { transform: function(doc, ret) {
      delete ret.__v;
      delete ret.googleId;
      delete ret.createdAt;
      delete ret.email;
      return ret;
     }},
    toJSON: { transform: function(doc, ret) {
      delete ret.__v;
      delete ret.email;
      delete ret.picture;
      delete ret.createdAt;
      delete ret.watched;
      return ret;
     }}
});

userSchema.statics.addToWatched = async function(movieId, userId) {
  let user = await this.findById(userId)
  let movie = await Movie.findOne({movieId: movieId})
  user.watched.push(movie._id)
  await user.save()
  return user
}



module.exports = mongoose.model('User', userSchema);
