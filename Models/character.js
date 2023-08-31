const mongoose = require('mongoose')

const CharacterSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Provide character name'],
        minLength: 2,
        maxLength: 50
    },
    medium:{
        type: String,
        required: [true, 'Provide medium where character originates from'],
        enum: ['TV Show', 'Movie', 'Book', 'Anime', 'Manga', 'Video Game']
    },
    quality:{
        type: String,
        required: [true, 'Provide your rating of the character'],
        enum: ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F']
    },
    type:{
        type: String,
        enum: ['Protagonist', 'Antagonist', 'Neutral'],
        default: 'Neutral'
    },
    abilities:{
        type: String,
        default: 'This character has no special abilities'
    },
    createdBy: {
        // Here we tie the character model to the user one: 
        type:mongoose.Types.ObjectId,
        ref: 'UserModel',
        required: [true, 'Provide user']
    }
}, {timestamps:true})

module.exports = mongoose.model('CharacterModel', CharacterSchema)