# Fictional-Character-REST-API

This is a REST-API built using Nodejs/Express and MongoDB Atlas.

Users can register or login. They can then add characters from their favorite media.

Each character will have the following details:
1. Name
2. Type: protagonist, antagonist
3. Medium: TV Show, Movie, Book, Anime, Manga, Video Game
4. Quality: A+, A, A-, B+, B, B-, C+, C, C-, D, F
5. Abilties: String 

Users can only access their own character recordings.
They can create characters, get all characters, get a single character, edit a character's information or delete a character (CRUD).

When getting all characters, users can filter to only access characters of a specific type, quality and/or medium.
