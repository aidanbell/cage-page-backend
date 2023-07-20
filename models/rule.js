const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ruleSchema = new Schema(
  {
    user: { 
      type: Schema.Types.ObjectId, 
      ref: "User",
      required: true, 
    },
    author: {
      type: String,
      default: 'Unknown'
    },
    content: {
      type: String,
      required: true,
      maxlength: 250,
    },
    toasts: [{ type: Schema.Types.ObjectId }],
    movieId: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

ruleSchema.virtual('toastCount').get(function() {
  return this.toasts.length;
});

ruleSchema.pre('save', function(next) {
  console.log(this);
  next();
});

ruleSchema.pre('remove', async function(next) {
  let movie = await Movie.findOne({movieId: this.movieId})
  movie.rules = movie.rules.filter(rule => rule._id !== this._id)
  await movie.save()
  next()
})

module.exports = mongoose.model('Rule', ruleSchema);