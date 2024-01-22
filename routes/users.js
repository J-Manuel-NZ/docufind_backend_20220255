var express = require('express');
var router = express.Router();

// Sign-in existing user
router.get('/:title', async (req, res, next) => {
    try {
      const document = await Document.findOne(req.params.title);
      res.render('document', { document });
    } catch (error) {
      console.log(error);
      res.render('error', {message: 'Could not find document'});
    }
  });

module.exports = router;
