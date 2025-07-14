const express = require('express');
const Assignment = require('../models/Assignment');
const upload = require('../middleware/upload');
const router = express.Router();

// Middleware to protect routes: only allows authenticated users
function isAuth(req, res, next) {
  if (req.isAuthenticated()) return next(); // If logged in, proceed
  res.redirect('/auth/login'); // Otherwise, redirect to login
}

// Show all assignments created by the logged-in user
router.get('/', isAuth, async (req, res) => {
  const assignments = await Assignment.find({ createdBy: req.user._id }).lean(); // Get only user's assignments
  res.render('assignments/list', { assignments, user: req.user });
});

// Show the assignment creation form
router.get('/create', isAuth, (req, res) => {
  res.render('assignments/create', { user: req.user });
});

router.post('/create', isAuth, upload.single('file'), async (req, res) => {
  const { title, description, dueDate } = req.body;

  // Create new assignment document
  await Assignment.create({
    title,
    description,
    dueDate,
    uploadedFile: req.file ? req.file.filename : null,
    createdBy: req.user._id
  });
  res.redirect('/assignments');
});

// Show form to edit a specific assignment
router.get('/edit/:id', isAuth, async (req, res) => {
  const assignment = await Assignment.findById(req.params.id).lean();
  res.render('assignments/edit', { assignment, user: req.user });
});

// Handle assignment edit form submission (optionally update file)
router.post('/edit/:id', isAuth, upload.single('file'), async (req, res) => {
  const { title, description, dueDate } = req.body;
  const update = { title, description, dueDate };

  // If a new file was uploaded, update the file field
  if (req.file) update.uploadedFile = req.file.filename;
  await Assignment.findByIdAndUpdate(req.params.id, update);
  res.redirect('/assignments');
});

// Delete a specific assignment
router.delete('/:id', isAuth, async (req, res) => {
  await Assignment.findByIdAndDelete(req.params.id);
  res.redirect('/assignments');
});

module.exports = router;
