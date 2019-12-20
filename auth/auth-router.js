const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const Auth = require('./auth-model');

router.post('/register', (req, res) => {
  let user = req.body;
    const hash = bcrypt.hashSync(user.password, 8); // 2 ^ n
    user.password = hash;

    Auth.registerUser(user)
        .then(saved => {
        res.status(201).json(saved);
        })
        .catch(error => {
        res.status(500).json(error);
        });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

    Auth.getUsersBy({ username })
        .first()
        .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          console.log("user and pass correct");
            //sign token
            const token = signToken(user);

            res.status(200).json({
            token,
            message: `Welcome ${user.username}!`,
            });
        } else {
            res.status(401).json({ message: 'Invalid Credentials' });
        }
        })
        .catch(error => {
        res.status(500).json({message: "there was an error"});
        });
});

function signToken(user) {
  const payload = {
      username: user.username,
  };

  const secret = process.env.JWT_SECRET || 'Super duper secret'

  const options = {
      expiresIn: '12h',
  }

  return jwt.sign(payload, secret, options);
}

module.exports = router;
