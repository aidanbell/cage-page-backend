# THE CAGE PAGE API

<img src="./public/images/cage.png" width=120 align="right"><a href="https://thecage.page/" target="_blank">🌐 Check it out here...</a> || <code>🖮 https://thecage.page/</code>
<hr>


## <a href="http://cage-page-backend.eba-vnkpz5mk.ca-central-1.elasticbeanstalk.com/">📚 The Docs</a>

## 💭 The Concept:

The Cage Page is a silly idea that has grown more and more. 
The concept was simple to begin with:
- A group of friends and I wanted to watch all of the worst movies
staring `Nic Cage`
- These movies were occasionally unbearable, so we were force to drink heavily
- There was no established drinking games for any of these movies, since a good deal of them never saw the flicker of a movie theatre projector

## ☑️ The Features:
- (Currently) 6 different endpoints to interact with the functionality of the app:
  - Index: Get all movies (starring Nic Cage, of course)
  - Detail: Get one movie by ID
  - Add to Watchlist: Add the movie to your watch list
  - Rules: Get all rules for a given movie
  - Add Rule: Create a new rule
  - Toast: Give a rule a toast, showing your affection


## 📋 The Process:
- The app was initially built on the Express framework using Mongoose to connect to a MongoDB database. The app began to develop the need for a more advanced front-end, so React was added to the existing backend. With the file structure becoming bloated by legacy code and a new front-end, the two were separated for better organization, and ease of deployment. The backend is currently deployed using AWS Elastic Beanstalk, EC2, and S3 Buckets for static assets. 

## 🧰 The Tech:
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Bulma](https://img.shields.io/badge/bulma-00D0B1?style=for-the-badge&logo=bulma&logoColor=white)

## 🔮 The Future:
In no order of priority, this is what I'm working to add to The Cage Page:
- Improved User Dashboard:
  - See engagement on rules
  - See total rules
- Rule reviews:
  - "this rule was too strong"
  - "this never happens"
  - etc

## 🤝 The Data:
### Movie data thanks to the amazing:
<img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg" align="center">
