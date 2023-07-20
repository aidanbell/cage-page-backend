# THE CAGE PAGE API

<img src="./public/images/cage.png" width=120 align="right"><a href="https://the-cage-page.herokuapp.com" target="_blank">🌐 Check it out here...</a> || <code>🖮 https://the-cage-page.herokuapp.com/</code>
<hr>

## 💭 The Concept:

The Cage Page is a silly idea that has grown more and more. 
The concept was simple to begin with:
- A group of friends and I wanted to watch all of the worst movies
staring `Nic Cage`
- These movies were occasionally unbearable, so we were force to drink heavily
- There was no established drinking games for any of these movies, since a good deal of them never saw the flicker of a movie theatre projector

## ☑️ The Features:
- Users should log in using Google Auth to begin the experience
- Users will land at a dashboard of all of their watched `Cage` movies
- Users can browse a list of movies (which obviously only include `Nic Cage`)
- Clicking on a movie will show a details view, complete with plot, genres, and a user rating
- From the details page, users can add the movie to their 'watched' list (Sorry, there's no unseeing a `Cage` movie)
- Users can also add rules to each Cage movie, which will show up in a scrollable section beside the movie details
- If a rule was particularly good, users can "Toast" a rule, adding to a running counter


## 📋 The Process:
- The app was built on the Express framework using Mongoose to connect to a MongoDB database. Passport and OAuth allow users to log in, and have ownership over rules and ratings. The original (and still current) version uses EJS as a templating engine, but there is a slow transistion happening to a more modern SPA front-end built with React. 

## 🔮 The Future:
In no order of priority, this is what I'm working to add to The Cage Page:
- Index indexing:
  - Sort by name, date, rules total, rating, etc
- Improved User Dashboard:
  - See engagement on rules
  - See total rules
- Rule reviews:
  - "this rule was too strong"
  - "this never happens"
  - etc
What I'm working on:
  - Transitioning to API calls from a SPA

## 🤝 The Data:
### Movie data thanks to the amazing:
<img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg" align="center">
