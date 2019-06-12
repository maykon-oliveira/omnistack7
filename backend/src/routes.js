const express = require('express');
const multer = require('multer');
const routes = express.Router();

const uploadConfig = require('./config/upload');
const PostController = require('./controllers/PostController');

const upload = multer(uploadConfig);

routes.post('/posts', PostController.store);

module.exports = routes;