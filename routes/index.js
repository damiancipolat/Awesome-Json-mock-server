const express = require('express');
const router  = express.Router();

const {
  NotFound,
  health
} = require('./custom.js');

const {  
  bindRoutes
} = require('./generic.js');

//Bind routes from base file.
bindRoutes(router);

//Declare custom routes.
router.get('/health',health);
router.get('*', NotFound);

module.exports = router;