const express = require('express');
const multer = require('multer');
const routes = express.Router();

const uploadConfig = require('./config/upload');
const PostController = require('./controllers/PostController');
const LikesController = require('./controllers/LikesController');

const upload = multer(uploadConfig);

routes.get('/posts', PostController.index);
routes.post('/posts', upload.single('image'), PostController.store);

routes.post('/posts/:id/like', LikesController.store);

module.exports = routes;