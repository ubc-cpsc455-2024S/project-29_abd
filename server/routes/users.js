var express = require('express');
var router = express.Router();
const User = require('../models/user');

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    const dayCards = await User.find();
    res.json(dayCards);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
