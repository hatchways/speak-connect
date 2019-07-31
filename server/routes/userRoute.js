const express = require("express");
const router = express.Router();
const { addUser, addPic, saveConvo, addConvo, likeUnlikeConvo, getConversations, saveComment, addComment } = require("../db");
const validate = require("../validate/validateNew");
const Users = require("../models/userModel");
const hash = require("../hash");
const authorize = require("../authorize");
const upload = require("../services/fileUpload");

const _ = require("lodash");

router.post("/", async (req, res, next) => {

  //validate input 
  const error = validate(req.body);

  if (error) {
    console.log(error.details[0].message)
    res.status(400).send(error.details[0].message);
    return;
  }

  let user = await Users.findOne({ username: req.body.username });
  if (user) return res.status(400).send('Username already exists')

  const _user = await Users.findOne({ email: req.body.email });
  if (_user) return res.status(400).send('Email already registered');

  //save user into database
  try {

    const { name, email, username } = req.body;

    //hash password
    const password = await hash(req.body.password);

    //create new user object
    user = new Users({
      name,
      username,
      email,
      password
    })

    //save user into database
    const userSaved = await addUser(user);

    if (typeof (userSaved.email) !== "undefined") {
      const response = _.pick(userSaved, ['_id', 'username', 'name', 'email']);
      const token = user.generateToken();
      res.header('x-auth-token', token).status(200).send(response);
      console.log('User registered successfully', userSaved);
    }
    else {
      res.status(500).send('Unable to register user');
    }
  }
  catch (e) {
    console.log(e)
  }
});


router.get("/conversations", async (req, res, next) => {
  const conversations = await getConversations();
  res.status(200).send(conversations);
})

router.get("/:id", async (req, res, next) => {
  try {
    const user = await Users.findById(req.params.id).populate('conversations');
    if (!user) return res.status(404).send('User not found');
    res.status(200).send(user);
  }
  catch (e) {
    res.status(500).send('Unable to retrieve user.Try again later')
    console.log('Unable to retrieve user');
  }
});

router.put("/:id", authorize, async (req, res, next) => {
  try {
    // Fetch user with the given id
    const user = await Users.findById(req.params.id);
    if (req.body.hasOwnProperty("location")) {
      user.location = req.body.location;
    }
    if (req.body.hasOwnProperty("description")) {
      user.description = req.body.description;
    }
    user.save();
    console.log('updated user', user);
    res.status(200).send(user);
  }
  catch (e) {
    console.log(e);
    res.status(500).send('Unable to update user.Try again later');
  }
})

router.put("/:id/avatar", (req, res, next) => {
  const image_upload = upload.single('image');
  image_upload(req, res, error => {
    if (error) {
      res.status(422).json({ "Error": error.message })
    }
    // Save new url 
    console.log('saved image blob', req.file)
    addPic(req.file.location, req.params.id);
    res.status(200).send('Picture updated!');
  })
});

router.put("/:id/conversations", (req, res, next) => {
  const audio_upload = upload.single('audio');
  audio_upload(req, res, error => {
    if (error) {
      res.status(422).json({ "Error": error.message })
    }
    // Save new audio in conversation collection
    saveConvo(req.body.title, req.file.location, req.params.id).
      then(convo => addConvo(req.params.id, convo._id))
    res.status(200).send('Audio clip added!')
  })
});

// route to like or unlike a conversation
router.put("/:id/conversations/like", (req, res, next) => {
  console.log("like request = ", req.body);
  likeUnlikeConvo(req.body.userID, req.body.convoID)
    .then(result => res.status(200).send("conversation successfully liked/unliked"))
    .catch(e => res.status(500).send('Unable to like/unlike!'));

});

router.post("/:userID/comments/:convoID", (req, res, next) => {
  const audio_upload = upload.single('audio');
  audio_upload(req, res, error => {
    if (error) {
      res.status(422).json({ "Error": error.message })
    }
    // Save new audio in comment collection
    saveComment(req.params.userID, req.file.location).
      then(comment => {
        console.log('saved comment', comment);
        addComment(req.params.convoID, comment._id)
      })
    res.status(200).send('New comment saved!')
  })
});


module.exports = router;
