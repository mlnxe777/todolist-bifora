const express = require('express');
const router = express.Router();
const taskCollection = require("../schema/taskSchema");

router.get('/', function (req, res, next) {
   res.send('it works');
});

router.post('/', async (req) => {
   const data = {
      description: req.body.description,
   }
   await taskCollection.insertMany([data]);
},
)

module.exports = router;