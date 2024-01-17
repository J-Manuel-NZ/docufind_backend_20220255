const express = require('express');
const router = express.Router();
const Document = require('../models/document');

// Display all documents
router.get('/', async (req, res, next) => {
  try {
    const documents = await Document.find({});
    res.render('index', { docs: documents });
  } catch (error) {
    console.log(error);
      res.render('error', {message: 'Could not find documents'});
  }
});

router.get('/add-document', (req, res) => {
  res.render('addDocument');
});

// Create a new document
router.post('/', async (req, res, next) => {
  const { title, description, documentFile, id} = req.body;
  var newDocument = new Document({
    title,
    description,
    documentfile,
    id,
    date: new Date()
  });

try {
  await newDocument.save();
  res.redirect('/');
} catch (error) {
  console.log(error);
  res.render('error', {message: 'Could not create document'});
}
});

// View a single document by title
router.get('/:title', async (req, res, next) => {
  try {
    const document = await Document.findOne(req.params.title);
    res.render('document', { document });
  } catch (error) {
    console.log(error);
    res.render('error', {message: 'Could not find document'});
  }
});

// Update a single document 
router.post('/:id', async (req, res, next) => {
  try {
    await Document.findOneAndUpdate(req.params.title, {$set: req.body});
    res.redirect('/');
  } catch (error) {
    console.log(error);
    res.render('error', {message: 'Could not update document'});
  }
})

// Delete a single document
router.get('/:id/delete', async (req, res, next) => {
  try {
    await Document.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (error) {
    console.log(error);
    res.render('error', {message: 'Could not delete document'});
  }
});

module.exports = router;
