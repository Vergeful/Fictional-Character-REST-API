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
    // Allow filtering to only access characters of a specific type, quality and/or medium:
    const {medium, type, quality} = req.query
    const queryItems = {}

    if(medium){
        queryItems.medium = medium
    }
    if(type){
        queryItems.type = type
    }
    if(quality){
        queryItems.quality = quality
    }

    console.log(queryItems)
    const characters = await CharacterModel.find({createdBy: req.user.userId, ...queryItems}).sort({updatedAt: -1}) // -1 to show more recent changes at beginning
    res.status(StatusCodes.OK).json({characters})
}

const getCharacter= async(req, res) => {
    const {id: characterId} = req.params // id param is from route and represents the job id
    const {userId} = req.user

    const character = await CharacterModel.findOne({
        _id: characterId,
        createdBy: userId // Avoid allowing anyone with the job id access to the job
    })

    if(!character){
        throw new CantFindError(`Character with id ${characterId} does not exist`)
    }

    res.status(StatusCodes.OK).json({character})
}

// Update
const updateCharacter= async(req, res) => {
    const {id: characterId} = req.params 
    const {userId} = req.user
    const {name, medium, quality} = req.body

    if(name === '' || medium === '' || quality === ''){
        throw new BadRequestError('Name, medium and quality are all required')
    }

    const character = await CharacterModel.findOneAndUpdate({
        _id: characterId,
        createdBy: userId
    }, req.body, {new:true, runValidators:true}) // new:true returns the new character

    if(!character){
        throw new CantFindError(`Character with id ${characterId} does not exist`)
    }

    res.status(StatusCodes.OK).json({character})
}


// Delete
const deleteCharacter= async(req, res) => {
    const {id: characterId} = req.params 
    const {userId} = req.user

    const character = await CharacterModel.findByIdAndDelete({
        _id: characterId,
        createdBy: userId
    })

    if(!character){
        throw new CantFindError(`Character with id ${characterId} does not exist`)
    }

    res.status(StatusCodes.OK).send()
}


module.exports ={
    createCharacter,
    getAllCharacters,
    getCharacter,
    updateCharacter,
    deleteCharacter
}