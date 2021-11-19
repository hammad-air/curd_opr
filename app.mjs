import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

mongoose.connect(
  'mongodb+srv://talha-dar:029029090909@cluster0.dvzlh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
);

const users = mongoose.model('Users', {
  name: String,
  email: String,
  address: String,
  contact: Number,
});

const app = express();
const port = process.env.PORT || 3000;

//* SETUP FOR CORS NOT COMPULSORY
app.use(
  cors({
    origin: '*',
    //* SETUP FOR REQUEST METHODS
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
  })
);

//* PARSE THE JSON REQUEST
app.use(express.json());

//* HOME PAGE
app.get('/', (req, res) => res.send('Home Page'));

//* GET ALL USERS
app.get('/users', (req, res) =>
  users
    .find({})
    .then((data) => res.status(200).send(data))
    .catch((err) => console.log(err))
);

//* GET SINGLE USER
app.get('/user/:id', (req, res) => {
  users
    .findOne({ _id: req.params.id })
    .then((data) => res.status(200).send(data))
    .catch(
      (err) => (res.status(400).send('An Error Occourde'), console.log(err))
    );
});

//* CREATE THE NEW USER
app.post('/user', (req, res) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.address ||
    !req.body.contact
  ) {
    res.status(400).send('Invalid Data');
  } else {
    new users({
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      contact: req.body.contact,
    })
      .save()
      .then(() => res.status(200).send('User Successfully Created.'))
      .catch(
        (err) => (res.status(404).send('An Error Occurred'), console.log(err))
      );
  }
});

//* UPDATE THE SINGLE USER
app.put('/user/:id', (req, res) => {
  users
    .findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      contact: req.body.contact,
    })
    .then(() => res.status(200).send('User Updated Successfully.'))
    .catch(
      (err) => (res.status(404).send('An Error Occurred'), console.log(err))
    );
});

// //* DELETE ALL USERS
app.delete('/users', (req, res) => {
  users
    .deleteMany({})
    .then(() => res.status(200).send('All Users Deleted.'))
    .catch(
      (err) => (res.status(404).send('User Not Found.'), console.log(err))
    );
});

//* DELETE THE SINGLE USER
app.delete('/user/:id', (req, res) => {
  users
    .findByIdAndDelete(req.params.id)
    .then(() => res.status(200).send('User Deleted'))
    .catch(
      (err) => (res.status(404).send('User Not Found.'), console.log(err))
    );
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));