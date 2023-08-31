const CharacterModel = require('../Models/character')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, CantFindError} = require('../Errors')

// Create
const createCharacter= async(req, res) => {
    req.body.createdBy = req.user.userId
    const character = await CharacterModel.create(req.body)
    res.status(StatusCodes.CREATED).json({character})
}

// Read
const getAllCharacters = async(req, res) => {
    res.send('Get All Characters')
}

const getCharacter= async(req, res) => {
    res.send('Get singular character')
}

// Update
const updateCharacter= async(req, res) => {
    res.send('Update a character')
}

// Delete
const deleteCharacter= async(req, res) => {
    res.send('Delete a character')
}


module.exports ={
    createCharacter,
    getAllCharacters,
    getCharacter,
    updateCharacter,
    deleteCharacter
}