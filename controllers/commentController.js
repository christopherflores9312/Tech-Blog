// const express = require('express');
// const router = express.Router();
// const { Comment, User } = require('../models'); 

// // Get all comments for a specific post
// router.get('/post/:id', async (req, res) => {
//   try {
//     const postData = await Post.findByPk(req.params.id, {
//       include: [
//         {
//           model: Comment,
//           attributes: ['id', 'comment_text', 'created_at'],
//           include: {
//             model: User,
//             attributes: ['username'],
//           },
//         },
//       ],
//     });

//     const post = postData.get({ plain: true });
//     res.render('single-post', { post });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Create a new comment
// router.post('/', async (req, res) => {
//   try {
//     if (req.session.logged_in) {
//       const newComment = await Comment.create({
//         ...req.body,
//         user_id: req.session.user_id,
//       });

//       res.status(200).json(newComment);
//     } else {
//       res.status(400).json({ message: 'You need to be logged in to comment' });
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// module.exports = router;
