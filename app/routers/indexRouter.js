const express = require('express');
const router = express.Router();
const path = require('path');
const request = require('request');

const opitons = {
    root: path.join(__dirname, 'pages')
}

router.get('/signup', (req, res, next) => {
    res.render('pages/signup.ejs');
})
router.get('/signin', (req, res, next) => {
    res.render('pages/signin.ejs');
})
router.post('/signin', (req, res, next) => {
    request.post('http://localhost:9000/user/signin', {
        json: {
            login: req.body.name, 
            password: req.body.pass
        }
    }, (error, response, body) => {
        if (error) {
            console.log(error);
            return res.status(500).json({message: 'Server error', error: error})
        }
        res.status(response.statusCode).json(body)
    })
})
router.post('/signup', (req, res, next) => {
    if (req.body.pass != req.body._pass) {
        return res.status(400).json({message: 'Passwords don\'t match'})
    }
    request.post('http://localhost:9000/user/signup', {
        json: {
            login: req.body.name,
            password: req.body.pass
        }
    }, (error, response, body) => {
        if (error) {
            console.log(error);
            return res.status(500).json({message: 'Server error', error: error})
        }
        res.status(response.statusCode).json(body)
    })
})

module.exports = router;