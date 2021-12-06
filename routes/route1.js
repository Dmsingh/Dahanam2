const express =require('express')
const signup = require('../controllers/auth.js')

const router = express.Router();

// Route for sending email
router.post('/signup', signup);


module.exports= router;