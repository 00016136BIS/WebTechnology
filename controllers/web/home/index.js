const Recipe_service = require('../../../services/Recipe')

const home_controller = {
    index: async (req, res) =>{
        res.render('home');
    },
    add: async (req, res) =>{
        res.render('home/add_update', { mode: 'Add' });
    },
    update: async (req, res) =>{
        const RecipeData = await Recipe_service.getById(req.params.id);
        res.render('home/add_update', { mode: 'Update', RecipeData: RecipeData });
    }
};
  
module.exports = home_controller;
