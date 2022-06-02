const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
  res.json({
    message: 'welcome hommies',
  });
});

app.post('/api/posts', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'post created dudes',
        authData,
      });
    }
  });
});

app.post('/api/login', (req, res) => {
  const user = {
    id: 1,
    username: 'brad',
    email: 'brad@gmail.com',
  };
  jwt.sign({ user: user }, 'secretkey', (err, token) => {
    res.json({
      token: token,
    });
  });
});

//Format of Toekn
//Authorization: Bearer <access_token></access_token>

//verifyToken
function verifyToken(req, res, next) {
  ///Get auth header value
  const bearerHeader = req.headers['authorization'];
  //check is bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    //splt at space
    const bearer = bearerHeader.split(' ');
    //get toekn from array
    const bearerToken = bearer[1];
    req.token = bearerToken;
    //call next in middewear
    next();
  } else {
    //forbidden
    res.sendStatus(403);
  }
}

app.listen(5000, () => console.log('Server started orn port 5000'));
