// // const express = require('express');
// // const router = express.Router();
// // const User = require('../Models/User'); // adjust path to your User model
// // const jwt = require('jsonwebtoken');

// // // Middleware to verify login
// // const authMiddleware = (req, res, next) => {
// //   const token = req.headers.authorization?.split(" ")[1];
// //   if (!token) return res.status(401).json({ message: "No token provided" });

// //   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
// //     if (err) return res.status(401).json({ message: "Invalid token" });
// //     req.userId = decoded.id;
// //     next();
// //   });
// // };

// // // 📌 Get all lists for the logged-in user
// // router.get('/', authMiddleware, async (req, res) => {
// //   try {
// //     const user = await User.findById(req.userId).select('favorites watchLater watchList');
// //     if (!user) return res.status(404).json({ message: 'User not found' });
// //     res.json(user);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // });

// // // 📌 Add a movie to a list
// // router.post('/:listType', authMiddleware, async (req, res) => {
// //   const { listType } = req.params; // 'favorites', 'watchLater', 'watchList'
// //   const { movieId } = req.body;

// //   if (!['favorites', 'watchLater', 'watchList'].includes(listType)) {
// //     return res.status(400).json({ message: 'Invalid list type' });
// //   }

// //   try {
// //     const user = await User.findById(req.userId);
// //     if (!user) return res.status(404).json({ message: 'User not found' });

// //     if (!user[listType].includes(movieId)) {
// //       user[listType].push(movieId);
// //       await user.save();
// //     }

// //     res.json({ message: `Movie added to ${listType}`, list: user[listType] });
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // });

// // // 📌 Remove a movie from a list
// // router.delete('/:listType/:movieId', authMiddleware, async (req, res) => {
// //   const { listType, movieId } = req.params;

// //   if (!['favorites', 'watchLater', 'watchList'].includes(listType)) {
// //     return res.status(400).json({ message: 'Invalid list type' });
// //   }

// //   try {
// //     const user = await User.findById(req.userId);
// //     if (!user) return res.status(404).json({ message: 'User not found' });

// //     user[listType] = user[listType].filter(id => id !== movieId);
// //     await user.save();

// //     res.json({ message: `Movie removed from ${listType}`, list: user[listType] });
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // });

// // module.exports = router;

// // const express = require('express');
// // const router = express.Router();
// // const User = require('../Models/User'); // adjust path
// // const jwt = require('jsonwebtoken');

// // // Middleware to check auth
// // function auth(req, res, next) {
// //   const token = req.headers.authorization?.split(" ")[1];
// //   if (!token) return res.status(401).json({ message: "No token" });

// //   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
// //     if (err) return res.status(401).json({ message: "Invalid token" });
// //     req.userId = decoded.id;
// //     next();
// //   });
// // }

// // // GET all lists for user
// // router.get('/', auth, async (req, res) => {
// //   try {
// //     const user = await User.findById(req.userId).select('favorites watchLater watchList');
// //     if (!user) return res.status(404).json({ message: "User not found" });
// //     res.json(user);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // });

// // // ADD a movie to a list
// // router.post('/:listType', auth, async (req, res) => {
// //   const { listType } = req.params; // favorites, watchLater, watchList
// //   const { movieId } = req.body;

// //   if (!['favorites', 'watchLater', 'watchList'].includes(listType)) {
// //     return res.status(400).json({ message: "Invalid list type" });
// //   }

// //   try {
// //     const user = await User.findById(req.userId);
// //     if (!user) return res.status(404).json({ message: "User not found" });

// //     if (!user[listType].includes(movieId)) {
// //       user[listType].push(movieId);
// //       await user.save();
// //     }

// //     res.json({ message: `Added to ${listType}`, list: user[listType] });
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // });

// // // REMOVE a movie from a list
// // router.delete('/:listType/:movieId', auth, async (req, res) => {
// //   const { listType, movieId } = req.params;

// //   if (!['favorites', 'watchLater', 'watchList'].includes(listType)) {
// //     return res.status(400).json({ message: "Invalid list type" });
// //   }

// //   try {
// //     const user = await User.findById(req.userId);
// //     if (!user) return res.status(404).json({ message: "User not found" });

// //     user[listType] = user[listType].filter(id => id !== movieId);
// //     await user.save();

// //     res.json({ message: `Removed from ${listType}`, list: user[listType] });
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // });

// // module.exports = router;

// const express = require('express');
// const router = express.Router();
// const User = require('../Models/User');
// const jwt = require('jsonwebtoken');

// // Middleware to check auth
// function auth(req, res, next) {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "No token" });

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) return res.status(401).json({ message: "Invalid token" });
//     req.userId = decoded.id;
//     next();
//   });
// }

// // ✅ GET all lists for user
// router.get('/', auth, async (req, res) => {
//   try {
//     const user = await User.findById(req.userId).select('favorites watchLater watchList');
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // ✅ Helper function to add to list
// async function addToList(req, res, listType) {
//   const { movieId } = req.body;
//   try {
//     const user = await User.findById(req.userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     if (!user[listType].includes(movieId)) {
//       user[listType].push(movieId);
//       await user.save();
//     }

//     res.json({ message: `Added to ${listType}`, list: user[listType] });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// }

// // ✅ Explicit routes for frontend compatibility
// router.post('/favorites/add', auth, (req, res) => addToList(req, res, 'favorites'));
// router.post('/watchLater/add', auth, (req, res) => addToList(req, res, 'watchLater'));
// router.post('/watchList/add', auth, (req, res) => addToList(req, res, 'watchList'));

// // ✅ Generic route (optional, keep for flexibility)
// router.post('/:listType', auth, async (req, res) => {
//   const { listType } = req.params;
//   if (!['favorites', 'watchLater', 'watchList'].includes(listType)) {
//     return res.status(400).json({ message: "Invalid list type" });
//   }
//   addToList(req, res, listType);
// });

// // ✅ REMOVE a movie from a list
// router.delete('/:listType/:movieId', auth, async (req, res) => {
//   const { listType, movieId } = req.params;
//   if (!['favorites', 'watchLater', 'watchList'].includes(listType)) {
//     return res.status(400).json({ message: "Invalid list type" });
//   }

//   try {
//     const user = await User.findById(req.userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     user[listType] = user[listType].filter(id => id !== movieId);
//     await user.save();

//     res.json({ message: `Removed from ${listType}`, list: user[listType] });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;
