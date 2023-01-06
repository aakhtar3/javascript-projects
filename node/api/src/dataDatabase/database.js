/**
 * Map <String, Set> - In memory database
 * Key - String to allow distinct repositories
 * Value - Set to allow a list of distinct objects
 * 
 * Pros - Keeps a distinct mapping that the prompt requires
 * Cons - Will not work in a distributed environment (Use Redis instead)
 */
const database = new Map();

module.exports = database;
