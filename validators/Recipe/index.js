const { body, param } = require('express-validator');
const Recipe_service = require('../../services/Recipe')

const addRecipeValidation = () => {
  return [
    body('RecipeName')
      .notEmpty().withMessage('Recipe name must not be empty')
      .isLength({ min: 1, max: 255 }).withMessage('Event name must be between 8 and 255 characters long'),
    body('MainIngridient')
      .notEmpty().withMessage('Main Ingridient must not be empty'),
    body('CookingTime')
      .notEmpty().withMessage('Cooking time must not be empty'),   
    body('contactPhone')
      .notEmpty().withMessage('Contact phone must not be empty')
      .matches(/^\+998\d{9}$/).withMessage('Invalid phone number format, it must be +998xxxxxxxxx')   
  ];
};

const deleteRecipeValidation = () => {
  return [
    param('id').custom(async (id) => {
      const exists = await Recipe_service.getById(id);
      if (!exists) {
        throw new Error('Recipe not found');
      }
    })
  ];
};

const updateRecipeValidation = () => {
  return [
    param('id').custom(async (id) => {
      const exists = await Recipe_service.getById(id);
      if (!exists) {
        throw new Error('Recipe not found');
      }
    }),
    body('RecipeName')
      .notEmpty().withMessage('Recipe name must not be empty')
      .isLength({ min: 1, max: 255 }).withMessage('Recipe name must be between 1 and 255 characters long'),
    body('MainIngridient')
      .notEmpty().withMessage('Main Ingridient must not be empty'),
    body('CookingTime')
        .notEmpty().withMessage('Cooking Time must not be empty'),
    body('contactPhone')
      .notEmpty().withMessage('Contact phone must not be empty')
      .matches(/^\+998\d{9}$/).withMessage('Invalid phone number format, it must be +998xxxxxxxxx'),      
  ];
};

module.exports = {
    addRecipeValidation,
    updateRecipeValidation,
    deleteRecipeValidation
};
