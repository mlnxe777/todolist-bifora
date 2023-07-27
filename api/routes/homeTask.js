const express = require('express');
const router = express.Router();
const taskCollection = require("../schema/taskSchema");

router.get('/', async function (req, res, next) {
   const task = await taskCollection.find();
   res.send(task);
})

router.post('/', async (req, res) => {
   const data = {
      description: req.body.description,
   }
   const insert = await taskCollection.insertMany([data]);
   res.send(insert);
})
router.delete("/todo/:id", async (req, res, next) => {
   try {
      await taskCollection.findByIdAndRemove(req.params.id)
      res.send("task deleted")
   } catch (err) {
      next({ status: 400, message: "failed to delete the task" })
   }
})
router.put("/todo/:id", async (req, res, next) => {
   try {
     const updatedTask = await taskCollection.findByIdAndUpdate(
       req.params.id,
       { isCompleted: true },
       { new: true }
     );
     res.json(updatedTask);
   } catch (err) {
     next({ status: 400, message: "Failed to update the task" });
   }
 });

module.exports = router;