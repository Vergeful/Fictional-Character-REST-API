// Create
const createCharacter= async(req, res) => {
    res.send('Create Character')
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