const fs = require('fs')

// access global mock db file
const Recipes = require(global.mock_db)

// write service method implementations
const Recipe_service = {
    getAll() {
        return Recipes
    },
	getById(id) {
        return Recipes.find(t => t.id == id)
    },    
    create(req, res) {
        let new_id = genRandId(4)
                
        const Recipe = req.body

        const new_Recipe = {
            id: new_id,
            Recipe: Recipe
        }

        Recipes.push(new_Recipe)
        
        writeToFile(Recipes)
        
        return new_Recipe
    },
    update(id, updateData){
        const RecipeIndex = Recipes.findIndex(t => t.id == id)

        if (RecipeIndex === -1) {
            return null
        }

        Recipes[RecipeIndex].Recipe = { ...Recipes[RecipeIndex].Recipe, ...updateData }

        writeToFile(Recipes)

        return Recipes[RecipeIndex]
    },
    delete(id) {
        const index = Recipes.findIndex(u => u.id == id)
        Recipes.splice(index, 1)    
        writeToFile(Recipes)
    }
}

// create function for overwriting the db file updated db content
let writeToFile = async (users) => {
    await 
        fs.writeFileSync(
            global.mock_db,
            JSON.stringify(
                users, null, 4
            ),
            'utf8'
        )
}

// generate random id inspired by uuid
let genRandId = (count) =>{
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < count; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

module.exports = Recipe_service