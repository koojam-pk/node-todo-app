var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

const Todo = require('./../models/todo');

router.get('/edit/:id', (req, res, next) => {
    Todo.findById(req.params.id, (error, todo) => {
        if (error) {
            return res.status(500).json({
                title: 'An error occured',
                error
            });
        }
        if (!todo) {
            return res.status(500).json({
                title: 'No Todo Found!',
                error: {message: 'Todo not found'}
            });
        }
        res.render('edit', {todo});
    });
});

router.post('/add', (req, res, next) => {
    const todo = new Todo({
        text: req.body.text,
        body: req.body.body
    });
    todo.save((error, result) => {
        if (error) {
            return res.status(500).json({
                title: 'An error occurred',
                error
            });
        }
        res.redirect('/');
    });
});

router.post('/edit/:id', (req, res, next) => {
    Todo.findById(req.params.id, (error, todo) => {
        if (error) {
            return res.status(500).json({
                title: 'An error occurred',
                error: error
            });
        }
        todo.text = req.body.text;
        todo.body = req.body.body;
        todo.save((error, result) => {
            if (error) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: error
                });
            }
            res.redirect('/');
        });
    });
});

router.delete('/delete/:id', (req, res, next) => {
    Todo.findById(req.params.id, (error, todo) => {
        if (error) {
            return res.status(500).json({
                title: 'An error occurred',
                error
            }); 
        }
        if (!todo) {
            return res.status(500).json({
                title: 'No Todo Found!',
                error: {message: 'Todo not found'}
            });
        }
        todo.remove((err, result) => {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted Todo',
                obj: result
            });
        });
    });
});

module.exports = router;