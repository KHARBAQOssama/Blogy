const express = require('express');
const { ensureAuthentication } = require('../Middlewares/authMiddleware')
const router = express.Router();
const csrf = require('csurf'); // Import the csurf middleware
const cookieParser = require('cookie-parser');

const CommentController = require('../Controllers/commentController')


const csrfProtection = csrf({ cookie: true });
router.use(cookieParser());

router.post('/post/:id', ensureAuthentication,csrfProtection, CommentController.create);

router.post('/:id/delete',ensureAuthentication, CommentController.deleteComment);

module.exports = router;