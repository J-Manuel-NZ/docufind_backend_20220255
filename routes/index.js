const mongoose =require('mongoose');
const express = require('express');
const router = express.Router();
const Document = require('../models/document');
const fs = require('fs');
// Multer Setup
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './files')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now()
    cb(null, uniqueSuffix + '-' + file.originalname)
  },
})

require("../models/document.js")
const DocumentSchema = mongoose.model("Document")
const upload = multer({ storage: storage })

// allow files to be accessible
router.use("/files", express.static("files"));

// Display all documents
router.get('/get-files', async (req, res, next) => {
  try {
    DocumentSchema.find({}).then((data) => {
      res.send({status: "ok", data: data});
    })
  } catch (error) {}
});

router.get('/add-document', (req, res) => {
  res.render('addDocument');
});

// Create a new document
router.post("/upload-files", upload.single("file"), async(req, res) => {
  console.log(req.file)
  const title = req.body.title;
  const description = req.body.description;
  const category = req.body.category;
  const documentFile = req.file.filename;
  const notes = req.body.notes;
  const id = req.body.id;
  try {
    await DocumentSchema.create({title: title, description: description, category: category, documentFile: documentFile, notes: notes, id: id});
    res.send({status: "ok"});
  } catch (error) {
    res.send({status: error});
  }
})

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
router.put('/update/:id', async (req, res, next) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.render('error', {message: 'Document not found'});
    }
    await Document.findOneAndUpdate(document, {
      title: req.body.title, 
      category: req.body.category,
      description: req.body.description,
      id: req.body.id,
    }, { new: true });
    res.send({status: "ok"});
  } catch (error) {
    console.log(error);
    res.render('error', {message: 'Could not update document'});
  }
})

// Delete a single document
router.delete('/:id/delete', async (req, res, next) => {
  console.log(req.params.id)
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.render('error', {message: 'Document not found'});
    }
    await Document.findByIdAndDelete(req.params.id);
    fs.unlink('files/' + document.documentFile, (err) => {
      if (err) {
          throw err;
      }
      console.log("Delete File successfully.");
      res.send({status: "ok"});
    });
  } catch (error) {
    console.log(error);
    res.render('error', {message: 'Could not delete document'});
  }
});

module.exports = router;
