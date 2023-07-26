const express = require('express');
const router = express.Router();
const taskCollection = require("../schema/taskSchema");

router.get('/', async function (req, res, next) {
   const task = await taskCollection.find();
   res.send(task);
});

router.post('/', async (req, res) => {
   const data = {
      description: req.body.description,
   }
   const insert = await taskCollection.insertMany([data]);
   res.send(insert);
},
)

module.exports = router;