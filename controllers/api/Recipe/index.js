// import specific service class
const Recipe_service = require('../../../services/Recipe')

// mention the service's needed actions (methods)
const Recipe_controller = {
    getAll(req, res) {
        res.json(Recipe_service.getAll())
    },
    create(req, res) {
        res.status(201).json(
            Recipe_service.create(req, res)
        )
    },
    update(req, res) {
        const Recipe = Recipe_service.update(req.params.id, req.body)
        
        if (Recipe) {
            res.json(Recipe)
        } else {
            res.status(404).send('Recipe not found')
        }
    },
    delete(req, res) {
		const Recipe = Recipe_service.getById(req.params.id)
		
        if (Recipe) {
            Recipe_service.delete(req.params.id)
			res.status(204).send('Recipe deleted successfully')
        } else {
            res.status(404).send('Recipe not found')
        }
    }
}

module.exports = Recipe_controller