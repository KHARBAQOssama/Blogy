const express = require('express');
const { ensureAuthentication } = require('../Middlewares/authMiddleware')
const router = express.Router();
const CommentController = require('../Controllers/commentController')

router.post('/post/:id', ensureAuthentication, CommentController.create);


module.exports = router;