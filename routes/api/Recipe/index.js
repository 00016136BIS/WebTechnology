const express = require('express');
const { validationResult } = require('express-validator');
const { addRecipeValidation, updateRecipeValidation, deleteRecipeValidation } = require('../../../validators/Recipe');

const router = express.Router();
const Recipe_controller = require('../../../controllers/api/Recipe');

// Define API routes
router.get('/', (req, res)=>{
  Recipe_controller.getAll(req, res);
});

router.post('/', addRecipeValidation(), (req, res)=>{
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    Recipe_controller.create(req, res)
})

router.put('/:id', updateRecipeValidation(), (req, res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  Recipe_controller.update(req, res)
})

router.delete('/:id', deleteRecipeValidation(), (req, res, next)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  Recipe_controller.delete(req, res)
})

module.exports = router;