const express = require('express')
const router = express.Router()

const {
    createCharacter,
    getAllCharacters,
    getCharacter,
    updateCharacter,
    deleteCharacter
} = require('../Controllers/characters')

// Alternative method to chain differnt HTTP methods using the same path:
router.route('/').post(createCharacter).get(getAllCharacters)
router.route('/:id').get(getCharacter).patch(updateCharacter).delete(deleteCharacter)

module.exports = router