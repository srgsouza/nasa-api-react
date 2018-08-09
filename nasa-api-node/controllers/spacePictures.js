const express = require('express');
const router = express.Router();

const SpacePicture = require('../models/spacePictures');

// route for all pictures
router.get('/', async (req, res) => {
  try {
    const data = await SpacePicture.find({});
    res.json({
      status: 200,
      data: data
    })
  } catch (error) {
    return next(err);
  }
});

// route for the edit page (pre-filled with existing data)
router.get('/:id/edit', async (req, res) => {
  try {
    const data = await SpacePicture.findById(req.params.id);
    res.json({
      user: data,
      id: req.params.id
    })
  } catch (error) {
    return next(err);
  }
});

// route for findByID 
router.get('/:id', async (req, res) => {
  try {
    const data = await SpacePicture.findById(req.params.id);
    res.json({
      user: data,
      index: req.params.id
    })
  } catch (error) {
    return next(err);
  }
});

// route to add item 
router.post('/', async (req, res) => {
  try {
    const data = await SpacePicture.create(req.body);
    res.json({
      status: 200, 
      data: data,
    });
  } catch (error) {
    return next(err);
  }
})

// route to update an item 
router.put('/:id', async (req, res) => {
  // req.body is the updated form info
  console.log(JSON.stringify(req));
  try {
    // await SpacePicture.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({
      status: 200
    })
  } catch (error) {
    return next(err);  }
});

// route to delete an item.  
router.delete('/:id', async (req, res) => {
  try {
    await SpacePicture.findByIdAndRemove(req.params.id);
    res.json({
      status: 200
    })
  } catch (error) {
    return next(err);  }
});

module.exports = router;
