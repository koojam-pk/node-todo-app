var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

const Todo = require('./../models/todo');

router.get('/', (req, res, next) => {
    Todo.find()
        .exec((error, todos) => {
            if (error) {
                return res.status(500).json({
                    title: 'An error occured',
                    error
                });
            }
            res.render('index', {todos});
        });
});
module.exports = router;
